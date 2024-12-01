import React from "react";
import { useRouter } from 'next/navigation';
import { DivEffect } from "@/lib/motion/effects";
import { RouteProps } from "@/routes";
import useSidebarStore from "@/modules/shared/store/useSidebar.store";
import { Badge } from "@/modules/shared/ui/badge";
import { useI18n } from "@/locale/client";

interface SingleMenuProps {
    route: RouteProps; 
    isActive: boolean;
    className?: string;
}

const SingleMenu: React.FC<SingleMenuProps> = ({ route, isActive, className }) => {
    const router = useRouter();  
    const { isSidebarMinimized } = useSidebarStore();
    const t = useI18n();

    const redirectList = () => {
        if(route.disabled != true) { router.push(`/app${route.path}`) }
    }
    return (
        <li  className={`items-center cursor-pointer rounded-sm text-sm relative dark:hover:bg-slate-500 dark:hover:bg-opacity-20 dark:hover:text-slate-200 ${isActive ? 'text-black dark:text-slate-200' : 'dark:text-gray-400'} ${route.disabled == true ? "dark:text-gray-700 cursor-not-allowed" : ""} ${className} `}
            onClick={redirectList} >
            <DivEffect whileTap={{ scale: 0.95 }}>
                <div className={`flex w-full ${!isSidebarMinimized ? "mt-1 px-6": "mt-1.5 px-5"} py-3 `}>
                    <span className="mr-3 icon-menu-svg"> {route.icon} </span>
                    <span className="mxd:hidden text-sm inline-block"> {!isSidebarMinimized ? route.title : null}  </span>
                </div>
            </DivEffect>
        </li>
    );
};
// {route.disabled == true ? <Badge variant={"outline"} className="p-0.5 text-xs inline-block" >{t("dashboard.badge.construction")}</Badge>: null}
export default SingleMenu;
