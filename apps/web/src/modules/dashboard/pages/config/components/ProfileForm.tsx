// components/ProfileForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/shared/ui/form";
import { Input } from "@/modules/shared/ui/input";
import SubmitButton from "@/modules/shared/components/buttons/submit";

const ProfileFormSchema = z.object({
  profileName: z.string().nonempty("Nome do perfil é obrigatório."),
  email: z.string().email("Insira um e-mail válido."),
});

type ProfileFormInputs = z.infer<typeof ProfileFormSchema>;

interface ProfileFormProps {
  defaultValues: ProfileFormInputs;
  onSubmit: (data: ProfileFormInputs) => Promise<void>;
  isLoading: boolean;
}

export default function ProfileForm({
  defaultValues,
  onSubmit,
  isLoading,
}: ProfileFormProps) {
  const form = useForm<ProfileFormInputs>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-400">Email</FormLabel>
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
        <div className="flex justify-end">
          <SubmitButton loading={isLoading}>Atualizar</SubmitButton>
        </div>
      </form>
    </Form>
  );
}
