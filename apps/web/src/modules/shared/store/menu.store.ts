import {create} from 'zustand';

interface MenuStore {
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  isOpenGroup: boolean;
  setIsOpenGroup: (isOpen: boolean) => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
  activeIndex: null,
  setActiveIndex: (index: number | null) => set({ activeIndex: index }),
  isOpenGroup: false,
  setIsOpenGroup: (isOpen: boolean) => set({ isOpenGroup: isOpen }),
}));
