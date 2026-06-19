// components/layout/app-sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserMenu } from "./user-menu";
import { sidebarItems } from "@/constants/sidebar-items";

type AppSidebarProps = {
  username: string;
  role: "ADMIN" | "USER";
};

export function AppSidebar({ username, role }: AppSidebarProps) {
  const pathname = usePathname();

  const items = sidebarItems.filter((item) => {
    if (item.adminOnly && role !== "ADMIN") {
      return false;
    }

    return true;
  });

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <UserMenu username={username} role={role} />
      </SidebarFooter>
    </Sidebar>
  );
}
