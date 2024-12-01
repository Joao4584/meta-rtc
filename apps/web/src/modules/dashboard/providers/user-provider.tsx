// src/context/UserProvider.tsx
import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useUserStore } from '@/modules/shared/store/user.store';
import { getUser } from '../services/get-user';
import Toasts from '@/lib/toast';

interface UserContextType {
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { setUser, loading } = useUserStore();

  const fetchUser = async () => {
    try {
      const response = await getUser(); 
      setUser(response.data)
    } catch (error: unknown) {
      Toasts.show("Ocorreu um erro ao buscar informações do usuario", "error")
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext deve ser usado dentro de um UserProvider');
  return context;
};
