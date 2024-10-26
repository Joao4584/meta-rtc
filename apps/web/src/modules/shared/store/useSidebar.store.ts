import {create} from 'zustand';

interface SidebarState {
  isSidebarMinimized: boolean;
  setSidebarMinimized: (minimized: boolean) => void;  
}

const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarMinimized: false,
  setSidebarMinimized: (minimized) => set({ isSidebarMinimized: minimized }),
}));

export default useSidebarStore;
