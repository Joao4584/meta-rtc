import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/modules/shared/ui/form";
import { Input } from "@/modules/shared/ui/input";
import { Button } from "@/modules/shared/ui/button";
import { LoginFormInputs } from "./Login";

interface LoginFormProps {
  form: UseFormReturn<LoginFormInputs>;
  loading: boolean;
  onSubmit: (data: LoginFormInputs) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ form, loading, onSubmit }) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Campo de Usuário */}
        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-600 dark:text-slate-200">Email ou Usuário</FormLabel>
              <FormControl>
                <Input
                  placeholder="Coloque seu email ou usuário"
                  className="dark:bg-slate-600 dark:border-slate-500"
                  {...field}
                />
              </FormControl>
              <FormMessage className="dark:text-red-400" />
            </FormItem>
          )}
        />

        {/* Campo de Senha */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-600 dark:text-slate-200">Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Coloque sua senha"
                  className="dark:bg-slate-600 dark:border-slate-500"
                  {...field}
                />
              </FormControl>
              <FormMessage className="dark:text-red-400" />
            </FormItem>
          )}
        />

        {/* Link de "Esqueceu sua senha" */}
        <div className="text-right mt-2">
          <a
            href="#"
            className="text-sm font-semibold dark:text-slate-300 text-slate-600 hover:text-blue-700 focus:text-blue-700"
          >
            Esqueceu sua senha?
          </a>
        </div>

        {/* Botão de Submit */}
        <Button
          disabled={loading}
          type="submit"
          className="w-full h-12 !bg-indigo-500 dark:!bg-indigo-500 hover:!bg-indigo-400 focus:!bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 hover:!text-white"
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
