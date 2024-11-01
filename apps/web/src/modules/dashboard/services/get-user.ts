"use client"
import api from "@/lib/axios";


export const loginUser = async (credentials: LoginCredentials) => {
  const { user, password } = credentials;

  try {
    const response = await api.get("/auth", { access: user, password });
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
