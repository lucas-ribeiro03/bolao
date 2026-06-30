// app/admin/page.tsx

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Trophy } from "lucide-react";

import { Plus } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>

        <p className="text-muted-foreground">
          Gerencie partidas, usuários e configurações do bolão.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Link href="/admin/matches">
          <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Partidas</CardTitle>

              <Trophy className="size-5" />
            </CardHeader>

            <CardContent>
              <CardDescription>
                Gerencie resultados e acompanhe as rodadas.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/matches/new-match">
          <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Nova partida</CardTitle>
              <Plus className="size-5" />
            </CardHeader>

            <CardContent>
              <CardDescription>Cadastrar uma nova partida.</CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
