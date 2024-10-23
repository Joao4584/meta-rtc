'use client';

import { useEffect, type ReactNode } from "react";
import { HeaderDashboard } from "../components/header/Header";
import { SidebarDashboard } from "../components/sidebar/Sidebar";
import { MainPattern } from "../ui/GridPattern";
import { useTheme } from "next-themes";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  return (
    <main className="w-full h-full overflow-hidden dark:text-slate-200">
      <MainPattern />
      <HeaderDashboard />
      <div className="flex w-full" style={{ height: "calc(100vh - 64px)"}}>
        <div className="w-56 h-full relative shadow-inner bg-gray-main-2 bg-opacity-50">
          <SidebarDashboard/>
        </div>
        <div className="shadow-inner"  style={{ width: "calc(100vw - 14rem)"}}>
          {children}
        </div>
      </div>
    </main>
  );
}
