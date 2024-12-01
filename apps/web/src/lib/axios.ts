'use client';

import axios from 'axios';
import { loadEnv } from "@project/env";
import type { ErrorsAxiosApi } from '@/modules/shared/types/error';
import { getCookie } from './cookie';

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin.replace(/:\d+$/, '')}:2222`;  
  } else {
    return `http://localhost:2222`; 
  }
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true, 
});

loadEnv();

api.interceptors.request.use(
  (config) => {
      const token = getCookie('session-token'); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
