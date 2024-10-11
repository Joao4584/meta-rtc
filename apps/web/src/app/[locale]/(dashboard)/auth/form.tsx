'use client';

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dayjs from 'dayjs';
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from 'next-themes';

import Toasts from '@/lib/toast';
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  user: z.string().min(1, { message: "Preencha um usuário válido." }),
  password: z.string().min(8, { message: "Senha não pode ser menor que 8 caracteres." }),
});

interface LoginFormInputs { user: string, password: string }

const FormLoginComponent: React.FC = () => {
  const { setTheme } = useTheme();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  });
  const [loadings, setLoadings] = useState<boolean>(false);

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  const login = async (data: LoginFormInputs) => {
    const { user, password } = data;
    setLoadings(true);
    const toastHandler = new Toasts();

    toastHandler.setMessage('Buscando..');
    toastHandler.setDescription(dayjs().locale('pt-br').format('DD/MM/YYYY HH:mm:ss'));
    toastHandler.setType('info');
    toastHandler.show();

    await api.post("/auth", { access: user, password: password })
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => {
        console.error('Erro durante o login:', error.message);
      })
      .finally(() => { setLoadings(false); });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(login)} className="mt-6 w-full space-y-4">
        <FormField control={form.control} name="user" render={({ field }) => (
            <FormItem>
                <FormLabel className="text-slate-600">Email ou Usuário</FormLabel>
                <FormControl>
                  <Input placeholder="Coloque seu email ou usuário" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem >
                <FormLabel className="text-slate-600">Senha</FormLabel>
                <FormControl> 
                  <Input type="password"  placeholder="Coloque sua senha" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <div className="text-right mt-2"> 
          <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Esqueceu sua senha?</a>
        </div>
        <Button disabled={loadings} type="submit"
          className="w-full h-12 block !bg-indigo-500 hover:!bg-indigo-400 focus:!bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 hover:!text-white" >
          Entrar
        </Button>
      </form>
    </Form>
  );
};

export default FormLoginComponent;