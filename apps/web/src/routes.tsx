'use client';

import { ChartScatter, Combine, LayoutDashboard, NotebookTabs } from "lucide-react";
import { ReactElement } from "react";

import { useI18n } from "./locale/client";

export interface RouteProps {
    title: string;
    icon: ReactElement;
    path: string;
}

export interface RouteGroup {
    groupName: string;
    icon: ReactElement;
    routes: RouteProps[];
}

export type RouteDefinition = RouteProps | RouteGroup;

export function getRouteDashboard(): RouteDefinition[] {
    const t = useI18n();

    return [
        {
            title: t("dashboard.routes.dashboard"),
            icon: <LayoutDashboard />,
            path: "/"
        },
        {
            title: t("dashboard.routes.social"),
            icon: <NotebookTabs />,
            path: "/social"
        },
        {
            title: t("dashboard.routes.sprint"),
            icon: <Combine />,
            path: "/sprints"
        },
        {
            title: t("dashboard.routes.diagram"),
            icon: <ChartScatter />,
            path: "/diagram"
        }
    ];
}
