import { useEffect, useState } from "react";
import { Divider } from "../ui/divider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/modules/shared/ui/select";
import { useI18n, useChangeLocale, useCurrentLocale } from "@/locale/client";

import usFlags from "@/assets/flags/4x3/us.svg";
import brFlags from "@/assets/flags/4x3/br.svg";
import { DivEffect } from "@/lib/motion/effects";
import { MoonStar, SunMoon } from "lucide-react";

interface LanguageListProps {
  path: string;
  name: string;
  icon: any;
}

export const LanguageThemes = () => {
  const t = useI18n();
  const changeLocale = useChangeLocale();
  const localeCurrent = useCurrentLocale();
  const [selectedLanguage, setSelectedLanguage] = useState<string>();
  // const [theme, setTheme] = useState<string>("light");

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

  useEffect(() => {
    setSelectedLanguage(localeCurrent);
  }, [localeCurrent]);

  //  const handleThemeChange = (selectedTheme: string) => {
  //   setTheme(selectedTheme);
  //   if (selectedTheme === "dark") {
  //     document.body.classList.add("dark");
  //   } else {
  //     document.body.classList.remove("dark");
  //   }
  // };

  const activeLanguage = languages.find((lang) => lang.path === selectedLanguage);

  return (
    <div className="w-full h-20 absolute bottom-0">
      <Divider className="border-dashed dark:border-gray-700" />
      <div className="w-full h-full gap-1 flex flex-wrap justify-center items-center">
        <div className="w-6/6">
        <DivEffect>
          <Select
            value={selectedLanguage}
            onValueChange={(value) => {
              setSelectedLanguage(value);
              changeLocale(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <span className="flex items-center">
                {activeLanguage && (
                  <span className="flex flex-wrap">
                    <img
                      src={activeLanguage.icon.src}
                      alt={activeLanguage.name}
                      className="w-5 h-5 mr-2"
                    />
                    <span>{activeLanguage.name}</span>
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
                      <img
                        src={element.icon.src}
                        alt={element.name}
                        className="w-5 h-5 mr-2"
                      />
                      <span>{element.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </DivEffect>

        </div>
       
        {/* <div className="w-1/6">
          <DivEffect>
            <Select
              value={theme}
              onValueChange={(value) => handleThemeChange(value)}
            >
              <SelectTrigger className="w-16">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Temas</SelectLabel>
                  <SelectItem value="light" >
                  <MoonStar className="w-4" />
                  </SelectItem>
                  <SelectItem value="dark"><SunMoon /> </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </DivEffect>
        </div> */}
      </div>
    </div>
  );
};
