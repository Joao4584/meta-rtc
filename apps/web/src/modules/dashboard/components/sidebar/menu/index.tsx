'use client';
import React, { useEffect } from "react";
import { usePathname } from 'next/navigation';
import { motion } from "framer-motion";
import { getRouteDashboard, RouteDefinition, RouteProps, RouteGroup } from "@/routes";
import GroupMenu from "./GroupMenu";
import SingleMenu from "./SingleMenu";
import { useMenuStore } from "@/modules/shared/store/menu.store";  

const MenuList: React.FC = () => {
    const pathname = usePathname();
    const dashboardSegment = (pathname.split(`/app/`)[1] || '');
    const routeDashboard = getRouteDashboard();
    const { activeIndex, setActiveIndex } = useMenuStore(); 

    useEffect(() => {
        let currentIndex: number | null = routeDashboard.findIndex((route: any) =>
            route.path === "/" + dashboardSegment ||
            (route instanceof Object && 'routes' in route && Array.isArray(route.routes) && route.routes.some((subRoute: RouteProps) => subRoute.path === "/" + dashboardSegment))
        );
        if (currentIndex === -1) { currentIndex = null; }
        
        if (currentIndex !== activeIndex) {
            setActiveIndex(currentIndex);
        }
    }, [pathname, routeDashboard, dashboardSegment, setActiveIndex, activeIndex]); 

    return (
        <div className="mt-4 h-100 w-full relative">
            {activeIndex !== null && (
                <motion.span className="absolute left-0 bg-cyber-grape-400 w-1.5 mt-1.5 mxd:mt-0 h-10 mxd:h-10 rounded-br-xl rounded-tr-xl shadow-cyber-grape-500 shadow-md"
                    layoutId="activeIndicator" initial={{ y: 0 }} animate={{ y: activeIndex * 48 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
            )}
            <ul className="w-full h-100 overflow-y-auto overflow-x-hidden">
                {routeDashboard.map((route, i) => (
                    <React.Fragment key={i}>
                        {isRouteGroup(route) ? (
                            <GroupMenu group={route as RouteGroup} dashboardSegment={dashboardSegment} />
                        ) : ( 
                            <SingleMenu route={route as RouteProps} isActive={"/" + dashboardSegment === route.path} />
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
};

export default MenuList;

function isRouteGroup(route: RouteDefinition): route is RouteGroup { return 'groupName' in route; }
