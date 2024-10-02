'use client';

import Logo from '@/public/images/logo.png';
import { DivEffect } from "@/src/lib/motion/Effects";
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { sendLogin } from '../login.request';
import { toast } from "sonner";
import dayjs from 'dayjs';
import { setToken } from '@/src/lib/token';
import Toasts from '@/src/lib/toast';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

interface LoginFormInputs {
    user: string;
    password: string;
}

const FormLoginComponent: React.FC = () => {
    const { setTheme } = useTheme();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const [loadings, setLoadings] = useState<boolean>(false);

    useEffect(() => {
        setTheme("light");
    }, [setTheme]);

    const login: SubmitHandler<LoginFormInputs> = async (data) => {
        const { user, password } = data;
        setLoadings(true);
        const toastHandler = new Toasts();

        toastHandler.setMessage('Buscando..');
        toastHandler.setDescription(dayjs().locale('pt-br').format('DD/MM/YYYY HH:mm:ss'));
        toastHandler.setType('info');
        toastHandler.show();

        try {
            const result: any = await sendLogin({ user, password });
            if (result.success === false) {
                console.error('Erro de login:', result.message);
                toastHandler.setMessage(result.message);
                toastHandler.setType('error');
                toastHandler.show();
            } else {
                toastHandler.setMessage('Login realizado com sucesso!');
                toastHandler.setType('success');
                toastHandler.show();
                setToken(result.data.hash);
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 2000);
            }
        } catch (error) {
            console.error('Erro durante a requisição de login:', error);
            toastHandler.setMessage('Ocorreu um erro durante o login.');
            toastHandler.setType('error');
            toastHandler.show();
        } finally {
            setLoadings(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(login)} className="mt-6">
            <div>
                <label className="block text-gray-500">Email ou Usuario:</label>
                <input
                    type="text"
                    {...register('user', { required: 'Preencha um usuário válido.' })}
                    placeholder="Coloque seu email ou usuario"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border ${errors.user ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:bg-white focus:outline-none`}
                />
                {errors.user && <span className="text-red-500 text-sm">{errors.user.message}</span>}
            </div>
            <div className="mt-4">
                <label className="block text-gray-500">Senha:</label>
                <input
                    type="password"
                    {...register('password', { required: 'Senha não pode ser menor que 8 caracteres.', minLength: { value: 8, message: 'Senha não pode ser menor que 8 caracteres.' } })}
                    placeholder="Coloque sua senha"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:bg-white focus:outline-none`}
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
            <div className="text-right mt-2">
                <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Esqueceu sua senha?</a>
            </div>
            <Button
                className="w-full h-12 block !bg-indigo-500 hover:!bg-indigo-400 focus:!bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 hover:!text-white"
                disabled={loadings}
                type="submit"
            >
                Entrar
            </Button>
        </form>
    );
};

export default FormLoginComponent;
