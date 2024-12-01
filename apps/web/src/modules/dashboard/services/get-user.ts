"use client"
import api from "@/lib/axios";


export const getUser = async () => {

  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error: any) {
    console.error("Erro durante o login:", error.message);
    throw {
      status: error.response?.status || 500,
      data: error.response?.data || null,
      message: error.message || "Erro desconhecido",
    };
  }
};
