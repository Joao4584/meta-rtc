import React from "react";
import { useRouter } from 'next/navigation';
import { DivEffect } from "@/lib/motion/effects";
import { RouteProps } from "@/routes";
import useSidebarStore from "@/modules/shared/store/useSidebar.store";

interface SingleMenuProps {
    route: RouteProps; 
    isActive: boolean;
    className?: string;
}

const SingleMenu: React.FC<SingleMenuProps> = ({ route, isActive, className }) => {
    const router = useRouter();  
    const { isSidebarMinimized } = useSidebarStore();

    return (
        <li className={`items-center cursor-pointer rounded-sm text-sm relative dark:hover:bg-slate-500 dark:hover:bg-opacity-20 dark:hover:text-slate-200 ${isActive ? 'text-black dark:text-slate-200' : 'dark:text-gray-400'} ${className}`}
            onClick={() => router.push(`/app${route.path}`)} >
            <DivEffect whileTap={{ scale: 0.95 }}>
                <div className={`flex w-full ${!isSidebarMinimized ? "mt-1": "mt-1.5"} py-3 px-6`}>
                    <span className="mr-3 icon-menu-svg"> {route.icon} </span>
                    <span className="mxd:hidden text-sm"> {!isSidebarMinimized ? route.title : null} </span>
                </div>
            </DivEffect>
        </li>
    );
};

export default SingleMenu;
