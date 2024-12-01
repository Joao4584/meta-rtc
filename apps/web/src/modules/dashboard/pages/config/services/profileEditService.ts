"use client";
import api from "@/lib/axios";
import type { ProfileFormInputs } from "../components/ProfileComponent";

interface ProfileEditServiceParams extends ProfileFormInputs {
  profileImage: File | null; // Adicionado para a imagem
}

export const profileEditService = async (credentials: ProfileEditServiceParams) => {
  const { profileName, email, profileImage } = credentials;

  const formData = new FormData();

  // Adicionar campos de texto
  formData.append("profileName", profileName);
  formData.append("email", email);

  // Adicionar imagem, se houver
  if (profileImage) {
    formData.append("profileImage", profileImage);
  }

  try {
    const response = await api.put("/users/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error: any) {
    console.error("Erro durante a atualização do perfil:", error.message);
    throw {
      status: error.response?.status || 500,
      data: error.response?.data || null,
      message: error.message || "Erro desconhecido",
    };
  }
};
