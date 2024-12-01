import {  useState } from "react";
import { Divider } from "@/modules/shared/ui/divider";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/modules/shared/ui/select";
import { useI18n, useChangeLocale, useCurrentLocale } from "@/locale/client";
import usFlags from "@/assets/flags/4x3/us.svg";
import brFlags from "@/assets/flags/4x3/br.svg";
import { DivEffect } from "@/lib/motion/effects";
import useSidebarStore from "@/modules/shared/store/useSidebar.store";

interface LanguageListProps {
  path: string;
  name: string;
  icon: string;
}

export const LanguageThemes = () => {
  const t = useI18n();
  const changeLocale = useChangeLocale();
  const localeCurrent = useCurrentLocale();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(localeCurrent);
  const { isSidebarMinimized } = useSidebarStore();

  const languages: LanguageListProps[] = [
    {
      path: "en",
      name: t("dashboard.translate.listLanguages.en"),
      icon: usFlags,
    },
    {
      path: "pt",
      name: t("dashboard.translate.listLanguages.pt"),
      icon: brFlags,
    },
  ];

  const handleChangeLanguage = (value: string) => {
    setSelectedLanguage(value);
    changeLocale(value);
  };

  const activeLanguage = languages.find((lang) => lang.path === selectedLanguage);

  return (
    <div className="w-full h-20 absolute bottom-0">
      <Divider className="border-dashed dark:border-gray-700 w-11/12 relative-center-x" />
      <div className="w-full h-full flex justify-center items-center gap-2">
        <DivEffect>
          <Select value={selectedLanguage} onValueChange={handleChangeLanguage}>
            <SelectTrigger className={`transition-all ${!isSidebarMinimized ? "w-[180px]" : "w-[42px]"}`}>
              <span className="flex items-center">
                {activeLanguage && (
                  <span className="flex flex-wrap">
                    <img src={activeLanguage.icon?.src} alt={activeLanguage.name} className="w-5 h-5 mr-2" />
                    {!isSidebarMinimized && <span>{activeLanguage.name}</span>}
                  </span>
                )}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t("dashboard.translate.traduction")}</SelectLabel>
                {languages.map((element, i) => (
                  <SelectItem key={i} value={element.path}>
                    <span className="flex items-center">
                      <img src={element.icon?.src} alt={element.name} className="w-5 h-5 mr-2" />
                      <span>{element.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </DivEffect>
      </div>
    </div>
  );
};
