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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/shared/ui/form";
import { Input } from "@/modules/shared/ui/input";
import type { ErrorsAxiosApi } from "@/modules/shared/types/error";
import { isErrorsAxiosApi } from "@/lib/axios";
import useCookie from "@/hooks/useCookie";
import { loadEnv } from "@project/env";

const FormSchema = z.object({
  user: z.string().min(1, { message: "Preencha um usuário válido." }),
  password: z.string().min(8, { message: "Senha não pode ser menor que 8 caracteres." }),
});

interface LoginFormInputs {
  user: string;
  password: string;
}

const FormLoginComponent: React.FC = () => {

  const [loadings, setLoadings] = useState<boolean>(false);
  const { cookieValue, updateCookie, deleteCookie } = useCookie("session-token");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { user: "", password: "" },
  });

  const login = async (data: LoginFormInputs) => {
    setLoadings(true);
    Toasts.show("Buscando...", "info", dayjs().locale("pt-br").format("DD/MM/YYYY HH:mm:ss"));

    try {
      const response = await loginUser(data); 
      updateCookie(response.data.hash);
      
      Toasts.show(`Logado com sucesso!`, "success", response.data.message);
      window.location.href = "/app" 
    } catch (error: unknown) {
      if (isErrorsAxiosApi(error)) {
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
      <form onSubmit={form.handleSubmit(login)} className="mt-6 w-full space-y-4">
        <FormField control={form.control} name="user"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-600 dark:text-slate-200">Email ou Usuário</FormLabel>
              <FormControl>
                <Input placeholder="Coloque seu email ou usuário" className="dark:bg-slate-600 dark:border-slate-500" {...field} />
              </FormControl>
              <FormMessage className="dark:text-red-400" />
            </FormItem>
          )}
        />
        <FormField control={form.control} name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-600 dark:text-slate-200">Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Coloque sua senha" className="dark:bg-slate-600 dark:border-slate-500" {...field} />
              </FormControl>
              <FormMessage className="dark:text-red-400" />
            </FormItem>
          )}
        />
        <div className="text-right mt-2">
            <a href="#" className="text-sm font-semibold dark:text-slate-300 text-slate-600 hover:text-blue-700 focus:text-blue-700">
              Esqueceu sua senha?
            </a>
        </div>
        <Button
          disabled={loadings} type="submit"
          className="w-full h-12 block !bg-indigo-500 dark:!bg-indigo-500 hover:!bg-indigo-400 focus:!bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 hover:!text-white">
          Entrar
        </Button>
      </form>
    </Form>
  );
};

export default FormLoginComponent;
