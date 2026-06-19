// components/layout/app-layout.tsx

import { ReactNode } from "react";

import { auth } from "@/lib/auth";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNavbar } from "@/components/layout/mobile-navbar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import LoginPage from "@/app/(public)/login/page";

type AppLayoutProps = {
  children: ReactNode;
};

export async function AppLayout({ children }: AppLayoutProps) {
  const session = await auth();

  return (
    <SidebarProvider>
      <AppSidebar username={session!.user.username} role={session!.user.role} />

      <SidebarInset>
        <MobileNavbar role={session!.user.role} />

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
