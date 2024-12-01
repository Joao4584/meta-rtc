import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/modules/shared/ui/form";
import { Input } from "@/modules/shared/ui/input";
import SubmitButton from "@/modules/shared/components/buttons/submit";
import { PasswordFormInputs } from "./PasswordEdit";

interface PasswordEditFormProps {
  form: UseFormReturn<PasswordFormInputs>;
  onSubmit: (data: PasswordFormInputs) => void;
  loading: boolean;
}

export default function PasswordEditForm({ form, onSubmit, loading }: PasswordEditFormProps) {
  return (
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
                  className="dark:bg-gray-800 text-white dark:border-slate-600 placeholder-gray-400 focus:outline-none focus:ring-2"
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
                    className="dark:bg-gray-800 text-white dark:border-slate-600 placeholder-gray-400 focus:outline-none focus:ring-2"
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
                    className="dark:bg-gray-800 text-white dark:border-slate-600 placeholder-gray-400 focus:outline-none focus:ring-2"
                    placeholder="Confirme sua nova senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            )}
          />
        </div>

        <SubmitButton loading={loading} className="w-full px-4 py-3">
          Alterar Senha
        </SubmitButton>
      </form>
    </Form>
  );
}
