"use client"
import api from "@/lib/axios";
import type { RegisterFormInputs } from "../components/formRegister";


export const registerUser = async (credentials: RegisterFormInputs) => {
  const { user, password, email, name } = credentials;

  try {
    const response = await api.post("/users", { user, password, email, name });
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
