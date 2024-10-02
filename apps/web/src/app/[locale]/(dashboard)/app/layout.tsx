import DashboardLayout from "@/components/layout/DashboardLayout";
import { AuthProvider } from "@/providers/auth-provider";
import React from "react";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <AuthProvider>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </AuthProvider>
    </React.Fragment>
  );
}