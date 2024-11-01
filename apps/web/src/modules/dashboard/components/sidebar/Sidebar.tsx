
import MenuList from "./menu";
import { LanguageThemes } from "./languageTheme";

export const SidebarDashboard = () => {

  return(
      <div className="w-full h-full relative flex flex-wrap overflow-hidden">
        <MenuList />
       <LanguageThemes/>
      </div>
  )

}