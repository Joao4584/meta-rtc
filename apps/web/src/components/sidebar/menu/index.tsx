'use client';
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { motion } from "framer-motion";

import { getRouteDashboard, RouteDefinition, RouteProps, RouteGroup } from "@/routes";
import GroupMenu from "./GroupMenu";
import SingleMenu from "./SingleMenu";

const MenuList: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const dashboardSegment = (pathname.split('/app/')[1] || '').split('/')[0];
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const routeDashboard = getRouteDashboard();
    
    useEffect(() => {
        const currentIndex = routeDashboard.findIndex((route: any) =>
            route.path === "/" + dashboardSegment ||
            (route instanceof Object && 'routes' in route && Array.isArray(route.routes) && route.routes.some((subRoute: RouteProps) => subRoute.path === "/" + dashboardSegment))
        );
        setActiveIndex(currentIndex);
    }, [pathname]);

    return (
        <div className="mt-4 h-full w-full relative">
            {activeIndex !== null && (
                <motion.span
                    className="absolute left-0 bg-cyber-grape-400 w-1.5 mt-1.5 mxd:mt-0 h-10 mxd:h-10 rounded-br-xl rounded-tr-xl shadow-cyber-grape-500 shadow-md"
                    layoutId="activeIndicator"
                    initial={{ y: 0 }}
                    animate={{ y: activeIndex * 48 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            )}
            <ul className="w-full h-100  overflow-y-auto overflow-x-hidden" >
                {routeDashboard.map((route, i) => (
                    <React.Fragment key={i}>
                        {isRouteGroup(route) ? (
                            <GroupMenu group={route as RouteGroup} dashboardSegment={dashboardSegment} router={router} />
                        ) : (
                            <SingleMenu route={route as RouteProps} isActive={"/" + dashboardSegment === route.path} router={router} />
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
};

export default MenuList;

function isRouteGroup(route: RouteDefinition): route is RouteGroup {
    return 'groupName' in route;
}
