"use client"
import api from "@/lib/axios";
import type { PasswordFormInputs } from "../components/PasswordEdit";

export const passwordAlter = async (credentials: PasswordFormInputs) => {
  const { oldPassword, password } = credentials;

  try {
    const response = await api.put("/users/password", { oldPassword: oldPassword, newPassword: password });
    return response;
  } catch (error: any) {
    console.error("Erro durante o login:", error.message);
    throw {
      status: error.response?.status || 500,
      data: error.response?.data || null,
      message: error.message || "Erro desconhecido",
    };
  }
};
