import LoadingDots from "@/modules/shared/components/loading/loadingDots";
import { AuthProvider } from "@/providers/auth-provider";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const DynamicDashboardLayout = dynamic(
  () => delay(1000).then(() => import('@/modules/shared/layout/DashboardLayout')), 
  { suspense: true }
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingDots type="dashboard" />}>
      <AuthProvider>
        <DynamicDashboardLayout>
          <Suspense fallback={<LoadingDots />}>
            {children}
          </Suspense>
        </DynamicDashboardLayout>
      </AuthProvider>
    </Suspense>
  );
}