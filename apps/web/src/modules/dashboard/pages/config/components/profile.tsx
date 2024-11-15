'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/modules/shared/ui/form";
import { Input } from "@/modules/shared/ui/input";

const ProfileFormSchema = z.object({
  profileName: z.string().nonempty("Nome do perfil é obrigatório."),
  email: z.string().email("Insira um e-mail válido."),
});

type ProfileFormInputs = z.infer<typeof ProfileFormSchema>;

export default function ProfileComponent() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const form = useForm<ProfileFormInputs>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      profileName: "Seu Nome",
      email: "admin@acmeinc.com",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setProfileImage(objectURL);
    }
  };

  const onSubmit = (data: ProfileFormInputs) => {
    console.log("Dados atualizados:", data);
    alert("Perfil atualizado com sucesso!");
  };

  return (
    <div className="flex-1 rounded-lg p-8">
      <h1 className="text-3xl font-semibold text-white mb-6">Meu Perfil</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Seção de Imagem e Nome */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Perfil</h2>
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400  flex items-center text-center justify-center h-full">
                    Sem Imagem
                  </span>
                )}
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Alterar Imagem de Perfil
                </label>
                <input
                  type="file"
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="profileName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Nome de Perfil</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="w-full bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Digite seu nome"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </section>

          {/* Seção de Email */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Email</h2>
            <p className="text-gray-400 text-sm mb-4">
              Certifique-se de usar um endereço de e-mail válido.
            </p>

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="email"
                        className="w-full bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Digite seu e-mail"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                className="bg-indigo-600 px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Atualizar
              </button>
            </div>
          </section>
        </form>
      </Form>
    </div>
  );
}
