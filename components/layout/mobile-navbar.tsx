"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menu } from "lucide-react";

import { sidebarItems } from "@/constants/sidebar-items";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type MobileNavbarProps = {
  role: "ADMIN" | "USER";
};

export function MobileNavbar({ role }: MobileNavbarProps) {
  const pathname = usePathname();

  const items = sidebarItems.filter((item) => {
    if (item.adminOnly && role !== "ADMIN") {
      return false;
    }

    return true;
  });

  return (
    <div className="border-b md:hidden">
      <div className="flex h-14 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Bolão</SheetTitle>
            </SheetHeader>

            <nav className="mt-8 flex flex-col gap-2">
              {items.map((item) => {
                const Icon = item.icon;

                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
                      isActive ? "bg-muted font-medium" : ""
                    }`}
                  >
                    <Icon className="size-4" />

                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>

        <span className="ml-4 font-semibold">Bolão</span>
      </div>
    </div>
  );
}
