// src/context/UserProvider.tsx
import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useUserStore } from '@/modules/shared/store/user.store';

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
      const response = await fetch('/api/user');
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      setUser(null);
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
