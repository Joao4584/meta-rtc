'use client';

import axios from 'axios';
import { loadEnv } from "@project/env"

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin.replace(/:\d+$/, '')}:2222`;
  } else {
    return `http://localhost:2222`;
  }
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
});

loadEnv();

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

export default api;
