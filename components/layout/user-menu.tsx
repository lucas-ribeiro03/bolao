"use client";

import { LogOut, Settings, User } from "lucide-react";

import { signOut } from "next-auth/react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SidebarMenuButton } from "@/components/ui/sidebar";

type UserMenuProps = {
  username: string;
  role: "ADMIN" | "USER";
};

export function UserMenu({ username, role }: UserMenuProps) {
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton size="lg">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col text-left">
            <span className="text-sm font-medium">{username}</span>

            <span className="text-muted-foreground text-xs">{role}</span>
          </div>
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="top" align="start" className="w-56">
        <DropdownMenuItem>
          <User />
          Perfil
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings />
          Configurações
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
          <LogOut />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
