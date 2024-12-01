// src/stores/userStore.ts
import { create } from 'zustand';



interface UserStore {
  user: any | null;
  loading: boolean;
  setUser: (userData: any) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: true,
  setUser: (userData) => set({ user: userData, loading: false }),
  clearUser: () => set({ user: null, loading: false }),
}));
