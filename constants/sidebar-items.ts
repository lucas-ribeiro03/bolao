import { Home, Trophy, Target, Shield, Settings } from "lucide-react";

export const sidebarItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
    adminOnly: false,
  },
  {
    title: "Palpites",
    href: "/guess",
    icon: Target,
    adminOnly: false,
  },
  {
    title: "Ranking",
    href: "/ranking",
    icon: Trophy,
    adminOnly: false,
  },
  // {
  //   // title: "Perfil",
  //   // href: "/profile",
  //   // icon: User,
  //   // adminOnly: false,
  // },
  // {
  //   title: "Usuários",
  //   href: "/admin/users",
  //   icon: Users,
  //   adminOnly: true,
  // },
  {
    title: "Administração",
    href: "/admin",
    icon: Shield,
    adminOnly: true,
  },
  {
    title: "Configurações",
    href: "/admin/settings",
    icon: Settings,
    adminOnly: true,
  },
] as const;
