'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCookie from "@/hooks/useCookie";
import Toasts from "@/lib/toast";
import { isErrorsAxiosApi } from "@/lib/axios";
import { loginUser } from "../services/loginUser";
import LoginForm from "./LoginForm";

const FormSchema = z.object({
  user: z.string().min(1, { message: "Preencha um usuário válido." }),
  password: z.string().min(8, { message: "Senha não pode ser menor que 8 caracteres." }),
});

export type LoginFormInputs = z.infer<typeof FormSchema>;

const LoginComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { updateCookie } = useCookie("session-token");

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(FormSchema),
    defaultValues: { user: "", password: "" },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);

    try {
      const response = await loginUser(data);
      updateCookie(response.data.hash);
      Toasts.show("Logado com sucesso!", "success", response.data.message);
      window.location.href = "/app";
    } catch (error: unknown) {
      if (isErrorsAxiosApi(error)) {
        Toasts.show("Erro ao realizar o Login", "error", error.data.message);
        console.error("Erro específico:", error);
      } else {
        Toasts.show("Erro desconhecido", "error", "Erro inesperado ao tentar logar.");
        console.error("Erro desconhecido:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 w-full">
      <LoginForm form={form} loading={loading} onSubmit={onSubmit} />
    </div>
  );
};

export default LoginComponent;
