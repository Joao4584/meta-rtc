'use client';

import React, { useState } from 'react';
import dayjs from 'dayjs';
import { registerUser } from '../services/registerUser';
import Toasts from '@/lib/toast';
import useDelay from '@/hooks/useDelay';
import { isErrorsAxiosApi } from '@/lib/axios';
import RegisterForm from './RegisterForm';
import { z } from 'zod';

export const FormSchema = z.object({
  user: z.string().min(1, { message: "Preencha um usuário válido." }).regex(/^\S*$/, { message: "Usuário não pode conter espaços." }),
  name: z.string().min(1, { message: "Preencha um nome válido." }).regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, { message: "Nome não pode conter números." }),
  email: z.string().email("Email inválido."),
  password: z.string().min(8, { message: "Não pode ser menor que 8 caracteres." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"], message: "As senhas não coincidem.",
});

export type RegisterFormInputs = z.infer<typeof FormSchema>;

const Register: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { delay } = useDelay();

  const handleSubmit = async (data: RegisterFormInputs) => {
    setLoading(true);
    Toasts.show("Cadastrando Usuário", "info", dayjs().locale("pt-br").format("DD/MM/YYYY HH:mm:ss"));

    try {
      const response = await registerUser(data);
      await delay(600);
      Toasts.show("Cadastrado com sucesso!", "success", response.data.message);
      await delay(1000);
      window.location.href = "/auth"; // Redireciona para a página de login
    } catch (error: unknown) {
      await delay(1000);
      if (isErrorsAxiosApi(error)) {
        Toasts.show("Erro ao cadastrar", "error", error.data.message);
      } else {
        Toasts.show("Erro desconhecido", "error", "Por favor, tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return <RegisterForm onSubmit={handleSubmit} loading={loading} />;
};

export default Register;
