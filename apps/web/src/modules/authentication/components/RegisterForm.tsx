'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/modules/shared/ui/form';
import { Input } from '@/modules/shared/ui/input';
import { Button } from '@/modules/shared/ui/button';
import { RegisterFormInputs, FormSchema } from './Register'; // Agora você pode importar corretamente o tipo aqui

const RegisterForm: React.FC<{ onSubmit: (data: RegisterFormInputs) => void, loading: boolean }> = ({ onSubmit, loading }) => {
  const form = useForm<RegisterFormInputs>({
    resolver: zodResolver(FormSchema),
    defaultValues: { user: '', password: '', name: '', email: '', confirmPassword: '' },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 w-full space-y-2 pb-4">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem className="space-y-0">
            <FormLabel className="text-slate-600 dark:text-slate-200">Nome:</FormLabel>
            <FormControl>
              <Input placeholder="Nome" className="dark:bg-slate-600 dark:border-slate-500" {...field} />
            </FormControl>
            <FormMessage className="dark:text-red-400" />
          </FormItem>
        )} />

        <FormField control={form.control} name="user" render={({ field }) => (
          <FormItem className="space-y-0">
            <FormLabel className="text-slate-600 dark:text-slate-200">Usuário:</FormLabel>
            <FormControl>
              <Input placeholder="Usuário" className="dark:bg-slate-600 dark:border-slate-500" {...field} />
            </FormControl>
            <FormMessage className="dark:text-red-400" />
          </FormItem>
        )} />

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem className="space-y-0">
            <FormLabel className="text-slate-600 dark:text-slate-200">E-mail:</FormLabel>
            <FormControl>
              <Input placeholder="E-mail" className="dark:bg-slate-600 dark:border-slate-500" {...field} />
            </FormControl>
            <FormMessage className="dark:text-red-400" />
          </FormItem>
        )} />

        <div className="flex gap-3 w-full relative">
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem className="space-y-0 w-1/2 mb-3">
              <FormLabel className="text-slate-600 dark:text-slate-200">Senha:</FormLabel>
              <FormControl>
                <Input type="password" className="dark:bg-slate-600 dark:border-slate-500" {...field} />
              </FormControl>
              <FormMessage className="dark:text-red-400" />
            </FormItem>
          )} />

          <FormField control={form.control} name="confirmPassword" render={({ field }) => (
            <FormItem className="space-y-0 w-1/2">
              <FormLabel className="text-slate-600 dark:text-slate-200">Confirme a Senha:</FormLabel>
              <FormControl>
                <Input type="password" className="dark:bg-slate-600 dark:border-slate-500" {...field} />
              </FormControl>
              <FormMessage className="dark:text-red-400" />
            </FormItem>
          )} />
        </div>

        <Button disabled={loading} type="submit" className="w-full h-12 block !bg-indigo-500 hover:!bg-indigo-400 focus:!bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 hover:!text-white">
          Cadastrar
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
