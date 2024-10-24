import React from "react";
import { useRouter } from 'next/navigation';
import { DivEffect } from "@/lib/motion/effects";
import { RouteProps } from "@/routes";

interface SingleMenuProps {
    route: RouteProps; 
    isActive: boolean;
    className?: string;
}

const SingleMenu: React.FC<SingleMenuProps> = ({ route, isActive, className }) => {
    const router = useRouter();  

    return (
        <li className={`items-center cursor-pointer rounded-sm text-sm relative dark:hover:bg-slate-500 dark:hover:bg-opacity-20 dark:hover:text-slate-200 ${isActive ? 'text-black dark:text-slate-200' : 'dark:text-gray-400'} ${className}`}
            onClick={() => router.push(`/app${route.path}`)} >
            <DivEffect whileTap={{ scale: 0.95 }}>
                <div className="flex w-full mt-1 py-3 px-6">
                    <span className="mr-3 icon-menu-svg"> {route.icon} </span>
                    <span className="mxd:hidden text-sm"> {route.title} </span>
                </div>
            </DivEffect>
        </li>
    );
};

export default SingleMenu;
