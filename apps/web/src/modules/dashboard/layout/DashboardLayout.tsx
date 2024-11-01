'use client';

import {  type ReactNode } from "react";
import { HeaderDashboard } from "../components/header/Header";
import { SidebarDashboard } from "@/modules/dashboard/components/sidebar/Sidebar";
import { MainPattern } from "../../shared/ui/GridPattern";
import useSidebarStore from "../../shared/store/useSidebar.store";
import { UserProvider } from "../providers/user-provider";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isSidebarMinimized } = useSidebarStore();


  return (
    <UserProvider>
      <main className="w-full h-full overflow-hidden dark:text-slate-200">
        <MainPattern />
        <HeaderDashboard />
        <div className="flex w-full" style={{ height: "calc(100vh - 64px)"}}>
          <div className={`${isSidebarMinimized ? "w-14": "w-56"} transition-all  h-full relative shadow-inner bg-gray-main-2 bg-opacity-50`}>
            <SidebarDashboard/>
          </div>
          <div className="shadow-inner"  style={{ width: `calc(100vw - ${isSidebarMinimized ? "56px" : "14rem"})`}}>
            {children}
          </div>
        </div>
      </main>
    </UserProvider>
  );
}
