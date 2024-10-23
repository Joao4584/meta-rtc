import { useState, useEffect } from 'react';

const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift(); 
    return cookieValue !== undefined ? cookieValue : undefined;
  }
  
  return undefined;
};

const setCookie = (name: string, value: string, days?: number) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

const removeCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=0; path=/`; 
};

const useCookie = (key: string) => {
  const [cookieValue, setCookieValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    const value = getCookie(key);
    setCookieValue(value);
  }, [key]);

  const updateCookie = (value: string, days?: number) => {
    setCookie(key, value, days);
    setCookieValue(value);
  };

  const deleteCookie = () => {
    removeCookie(key);
    setCookieValue(undefined);
  };

  return { cookieValue, updateCookie, deleteCookie };
};

export default useCookie;
