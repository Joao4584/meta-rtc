import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { RouteGroup, type RouteProps } from "@/routes";
import SingleMenu from "./SingleMenu";
import { DivEffect } from "@/lib/motion/effects";


interface GroupMenuProps {
    group: RouteGroup;
    dashboardSegment: string;
}

const GroupMenu: React.FC<GroupMenuProps> = ({ group, dashboardSegment }) => {
    const [isOpenGroup, setIsOpenGroup] = useState(false);
    const [haveActive, setHaveActive] = useState(false);

    useEffect(() => {
        const isActive = group.routes.some((route: RouteProps) => "/" + dashboardSegment === route.path);
        setHaveActive(isActive); 
        setIsOpenGroup(isActive);
    }, [dashboardSegment, group.routes]);

    const toggleOpen = () => { setIsOpenGroup(!isOpenGroup); };

    return (
        <React.Fragment>
            <li onClick={toggleOpen} className={`items-center cursor-pointer rounded-sm text-sm relative dark:hover:bg-slate-500 dark:hover:bg-opacity-20 dark:hover:text-slate-400`}>
                <DivEffect whileTap={{ scale: 0.95 }}>
                    <div className={`flex w-full mt-1 py-3 px-6 ${haveActive ? 'text-black dark:text-slate-200' : 'dark:text-gray-400'}`}>
                        <span className="mr-3 icon-menu-svg">{group.icon}</span>
                        <span className="flex-1 mxd:hidden">{group.groupName}</span>
                        <span className="ml-3 mxd:hidden mt-0.5 icon-menu-svg"> 
                            {isOpenGroup ? <ChevronDown /> : <ChevronRight />}
                        </span>
                    </div>
                </DivEffect>
            </li>
            {isOpenGroup && group.routes && (
                group.routes.map((route, index) => (
                    <SingleMenu key={index} route={route} isActive={"/" + dashboardSegment === route.path} className="pl-3" />
                ))
            )}
        </React.Fragment>
    );
};

export default GroupMenu;