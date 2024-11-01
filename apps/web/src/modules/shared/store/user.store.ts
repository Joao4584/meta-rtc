// src/stores/userStore.ts
import { create } from 'zustand';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserStore {
  user: User | null;
  loading: boolean;
  setUser: (userData: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: true,
  setUser: (userData) => set({ user: userData, loading: false }),
  clearUser: () => set({ user: null, loading: false }),
}));
