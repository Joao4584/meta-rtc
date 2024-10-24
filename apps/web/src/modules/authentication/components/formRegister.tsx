'use client';

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";

import Toasts from "@/lib/toast";
import { loginUser } from "../services/loginUser";
import { Button } from "@/modules/shared/ui/button";
import { Form,FormControl,FormField, FormItem, FormLabel, FormMessage, } from "@/modules/shared/ui/form";
import { Input } from "@/modules/shared/ui/input";
import type { ErrorsAxiosApi } from "@/modules/shared/types/error";
import { isErrorsAxiosApi } from "@/lib/axios";
import { registerUser } from "../services/registerUser";
import useDelay from "@/hooks/useDelay";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  user: z.string().min(1, { message: "Preencha um usuário válido." }).regex(/^\S*$/, { message: "Usuário não pode conter espaços." }),
  name: z.string().min(1, { message: "Preencha um nome válido." }).regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, { message: "Nome não pode conter números." }),
  email: z.string().email("Email inválido."),
  password: z.string().min(8, { message: "Não pode ser menor que 8 caracteres." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"], message: "As senhas não coincidem.",
});

export type RegisterFormInputs = z.infer<typeof FormSchema>;

const FormRegisterComponent: React.FC = () => {
  const [loadings, setLoadings] = useState<boolean>(false);
  const { delay } = useDelay();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { user: "", password: "", name:"", email: "", confirmPassword: "" },
  });

  const login = async (data: RegisterFormInputs) => {
    setLoadings(true);
    Toasts.show("Cadastrando Usuario", "info", dayjs().locale("pt-br").format("DD/MM/YYYY HH:mm:ss"));

    try {
      const response = await registerUser(data); 
      await delay(600);
      Toasts.show(`Cadastrado com sucesso!`, "success", response.data.message);
      console.log(response);
      await delay(1000);
      window.location.href = "/auth" 
    } catch (error: unknown) {
      await delay(1000);
      if (isErrorsAxiosApi(error)) {
        console.log(error)
        Toasts.show(`Erro ao realizar o Login`, "error", error.data.message);
        console.error("Erro específico:", error);
      } else {
        Toasts.show("Erro desconhecido", "error", "Test");
        console.error("Erro desconhecido:", error);
      }
    } finally {
      setLoadings(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(login)} className="mt-6 w-full space-y-2 pb-4">
        <FormField control={form.control} name="name"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="text-slate-600 dark:text-slate-200">Nome:</FormLabel>
              <FormControl>
                <Input placeholder="" className="dark:bg-slate-600 dark:border-slate-500" {...field} />
              </FormControl>
              <FormMessage  className="dark:text-red-400"/>
            </FormItem>
          )}
        />
        <FormField control={form.control} name="user"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="text-slate-600 dark:text-slate-200">Usuário:</FormLabel>
              <FormControl>
                <Input placeholder="" className="dark:bg-slate-600 dark:border-slate-500" {...field} />
              </FormControl>
              <FormMessage  className="dark:text-red-400"/>
            </FormItem>
          )}
        />
        <FormField control={form.control} name="email"
          render={({ field }) => (
            <FormItem className="space-y-0 ">
              <FormLabel className="text-slate-600 dark:text-slate-200">E-mail:</FormLabel>
              <FormControl>
                <Input placeholder="" className="dark:bg-slate-600 dark:border-slate-500" {...field} />
              </FormControl>
              <FormMessage  className="dark:text-red-400"/>
            </FormItem>
          )}
        />
        <div className="flex gap-3 w-full relative">
          <FormField control={form.control} name="password"
            render={({ field }) => (
              <FormItem className="space-y-0 w-1/2 mb-3">
                <FormLabel className="text-slate-600 dark:text-slate-200">Senha:</FormLabel>
                <FormControl>
                  <Input type="password" className="dark:bg-slate-600 dark:border-slate-500" placeholder="" {...field} />
                </FormControl>
                <FormMessage  className="dark:text-red-400"/>
              </FormItem>
            )}
          />
          <FormField control={form.control} name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-0 w-1/2">
                <FormLabel className="text-slate-600 dark:text-slate-200">Confirme a Senha:</FormLabel>
                <FormControl>
                  <Input type="password" className="dark:bg-slate-600 dark:border-slate-500" placeholder="" {...field} />
                </FormControl>
                <FormMessage  className="dark:text-red-400"/>
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={loadings} type="submit"
          className="w-full h-12 block !bg-indigo-500 hover:!bg-indigo-400 focus:!bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 hover:!text-white">
          Cadastrar
        </Button>
      </form>
    </Form>
  );
};

export default FormRegisterComponent;
