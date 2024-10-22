'use client';

import axios from 'axios';
import { loadEnv } from "@project/env";
import type { ErrorsAxiosApi } from '@/modules/shared/types/error';

// Função para obter a base URL da API
const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin.replace(/:\d+$/, '')}:2222`;  // Porta correta
  } else {
    return `http://localhost:2222`;  // No servidor ou durante desenvolvimento
  }
};

// Cria a instância do Axios
const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,  // Necessário para cookies e autenticação
});

loadEnv();

// Interceptador para adicionar JWT no header, se presente
api.interceptors.request.use(
  (config) => {
    const sessionJwtKey = process.env.SESSION_JWT_STORAGE;
    if (sessionJwtKey) {
      const token = localStorage.getItem(sessionJwtKey); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export function isErrorsAxiosApi(error: unknown): error is ErrorsAxiosApi {
  return typeof error === 'object' && error !== null && 'message' in error;
}
export default api;
