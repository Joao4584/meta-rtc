import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";

import { RouteGroup } from "@/routes";
import SingleMenu from "./SingleMenu";

interface GroupMenuProps {
    group: RouteGroup;
    dashboardSegment: string;
    router: any;
}

const GroupMenu: React.FC<GroupMenuProps> = ({ group, dashboardSegment, router }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };
    

    return (
        <React.Fragment>
            <li
                className={`items-center cursor-pointer rounded-sm text-sm relative dark:hover:bg-slate-500 dark:hover:bg-opacity-20 dark:hover:text-slate-200`}
                onClick={toggleOpen}
            >
                <motion.div whileTap={{ scale: 0.95 }}>
                    <div className="flex w-full mt-1 py-3 px-6">
                        <span className="mr-3 icon-menu-svg">{group.icon}</span>
                        <span className="flex-1 mxd:hidden">{group.groupName}</span>
                        <span className="ml-3 mxd:hidden mt-0.5 icon-menu-svg">
                            {isOpen ? <ChevronDown /> : <ChevronRight />}
                        </span>
                    </div>
                </motion.div>
            </li>
            {isOpen && group.routes && (
                group.routes.map((route, index) => (
                    <SingleMenu key={index} route={route} className="pl-3" isActive={"/" + dashboardSegment === route.path} router={router} />
                ))
            )}
        </React.Fragment>
    );
};

export default GroupMenu;