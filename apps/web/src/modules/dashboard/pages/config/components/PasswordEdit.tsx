'use client';

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/modules/shared/ui/form";
import { Input } from "@/modules/shared/ui/input";

const FormSchema = z.object({
  oldPassword: z.string().nonempty("Senha atual é obrigatória."),
  password: z.string().min(8, { message: "Nova senha deve ter pelo menos 8 caracteres." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "As senhas não coincidem.",
});

export type PasswordFormInputs = z.infer<typeof FormSchema>;

export default function PasswordEditComponent() {
  const form = useForm<PasswordFormInputs>({
    resolver: zodResolver(FormSchema),
    defaultValues: { oldPassword: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (data: PasswordFormInputs) => {
    
  };

  return (
    <div className="flex-1 rounded-lg p-8">
      <h1 className="text-3xl font-semibold text-white mb-6">Alterar Senha</h1>
      <p className="text-gray-400 text-sm mb-4">
        Para alterar sua senha, preencha os campos abaixo.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-600 dark:text-slate-400">Senha Atual</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="dark:bg-gray-800 text-white dark:border-slate-600 placeholder-gray-400 focus:outline-none focus:ring-2 "
                    placeholder="Digite sua senha atual"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            )}
          />

         <div className="flex gap-3 pb-3">
          <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="text-slate-600 dark:text-slate-400">Nova Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="dark:bg-gray-800 text-white dark:border-slate-600 placeholder-gray-400 focus:outline-none focus:ring-2 "
                      placeholder="Digite sua nova senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="text-slate-600 dark:text-slate-400">Confirmar Nova Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="dark:bg-gray-800 text-white dark:border-slate-600 placeholder-gray-400 focus:outline-none focus:ring-2 "
                      placeholder="Confirme sua nova senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />
         </div>

          <button
            type="submit"
            className="w-full bg-indigo-700 px-4 py-3  rounded-md text-white font-medium hover:bg-indigo-500"
          >
            Alterar Senha
          </button>
        </form>
      </Form>
    </div>
  );
}
