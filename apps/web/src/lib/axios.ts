'use client';

import axios from 'axios';
import { cookies } from 'next/headers';

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin.replace(/:\d+$/, '')}:2222`;
  } else {
    const origin = cookies().get('token') ? 'http://localhost' : 'http://localhost';
    return `${origin.replace(/:\d+$/, '')}:2222`;
  }
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
});

api.interceptors.request.use(
  (config) => {
    const token = cookies().get('token')?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
