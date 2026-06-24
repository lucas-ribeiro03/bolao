import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { AppLayout } from "@/components/layout/app-layout";
import { Toaster } from "sonner";
import LoginPage from "../(public)/login/page";

export async function AuthGate({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    return <LoginPage />;
  }

  return (
    <AppLayout role={session.user.role} username={session.user.username}>
      {children}
      <Toaster position="top-center" duration={2000} theme="dark" />
    </AppLayout>
  );
}
