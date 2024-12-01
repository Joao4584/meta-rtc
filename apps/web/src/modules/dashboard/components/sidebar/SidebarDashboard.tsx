import MenuList from "./MenuList";
import { LanguageThemes } from "./LanguageThemes"; 
import useSidebarStore from "@/modules/shared/store/useSidebar.store";

export const SidebarDashboard = () => {
  const { isSidebarMinimized } = useSidebarStore();

  return (
    <div
      className={`w-full h-full flex flex-col overflow-hidden transition-all ${
        isSidebarMinimized ? "w-[60px]" : "w-[250px]"
      }`}
    >
      <MenuList />
      <LanguageThemes />
    </div>
  );
};
