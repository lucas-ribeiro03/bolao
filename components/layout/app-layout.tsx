// components/layout/app-layout.tsx

import { ReactNode } from "react";

import { auth } from "@/lib/auth";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNavbar } from "@/components/layout/mobile-navbar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import LoginPage from "@/app/(public)/login/page";

type AppLayoutProps = {
  children: ReactNode;
  username: string;
  role: "ADMIN" | "USER";
};

export async function AppLayout({ children, role, username }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar username={username} role={role} />

      <SidebarInset>
        <MobileNavbar role={role} />

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
