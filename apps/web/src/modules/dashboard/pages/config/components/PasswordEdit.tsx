'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useDelay from "@/hooks/useDelay";
import { passwordAlter } from "../services/passwordEditService";
import Toasts from "@/lib/toast";
import { isErrorsAxiosApi } from "@/lib/axios";
import PasswordEditForm from "./PasswordEditForm";

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
  const [loadings, setLoadings] = useState<boolean>(false);
  const { delay } = useDelay();

  const form = useForm<PasswordFormInputs>({
    resolver: zodResolver(FormSchema),
    defaultValues: { oldPassword: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: PasswordFormInputs) => {
    setLoadings(true);

    try {
      const response = await passwordAlter(data);
      await delay(600);
      Toasts.show(`Senha alterada com sucesso!`, "success", response.data.message);
      form.reset();
    } catch (error: unknown) {
      await delay(1000);
      if (isErrorsAxiosApi(error)) {
        Toasts.show(`Erro ao alterar`, "error", error.data.message);
      } else {
        console.error("Erro desconhecido:", error);
      }
    } finally {
      setLoadings(false);
    }
  };

  return (
    <div className="flex-1 rounded-lg p-8">
      <h1 className="text-3xl font-semibold text-white mb-6">Alterar Senha</h1>
      <p className="text-gray-400 text-sm mb-4">
        Para alterar sua senha, preencha os campos abaixo.
      </p>
      <PasswordEditForm form={form} onSubmit={onSubmit} loading={loadings} />
    </div>
  );
}
