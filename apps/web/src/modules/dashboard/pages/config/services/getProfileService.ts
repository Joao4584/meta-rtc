"use client";
import api from "@/lib/axios";

export const profileEditService = async () => {

  try {
    const response = await api.get("/users/profile");
    return response;
  } catch (error: any) {
    throw {
      status: error.response?.status || 500,
      data: error.response?.data || null,
      message: error.message || "Erro desconhecido",
    };
  }
};
