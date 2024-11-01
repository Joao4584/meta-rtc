import LoadingDots from "@/modules/shared/components/loading/loadingDots";
import { AuthProvider } from "@/modules/dashboard/providers/auth-provider";
import DashboardProvider from '@/modules/dashboard/layout/DashboardLayout';
import React, { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingDots type="dashboard" />}>
      <AuthProvider>
        <DashboardProvider>
          <Suspense fallback={<LoadingDots />}>
            {children}
          </Suspense>
        </DashboardProvider>
      </AuthProvider>
    </Suspense>
  );
}