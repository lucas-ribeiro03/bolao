"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { EditMatchDialog } from "./edit-match-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type MatchesTableProps = {
  matches: {
    id: string;
    round: string;
    score1: number | null;
    score2: number | null;
    finished: boolean;
    matchDateTime: Date;

    team1: {
      name: string;
    };

    team2: {
      name: string;
    };
  }[];
};

export function MatchesTable({ matches }: MatchesTableProps) {
  const [selectedMatch, setSelectedMatch] = useState<
    MatchesTableProps["matches"][number] | null
  >(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedRound = searchParams.get("round") ?? "all";

  return (
    <>
      <div>
        <div className="mb-4 flex items-center gap-4">
          <Select
            value={selectedRound}
            onValueChange={(value) => {
              const params = new URLSearchParams(searchParams);

              if (value === "all") {
                params.delete("round");
              } else {
                params.set("round", value);
              }

              router.push(`/admin/matches?${params.toString()}`);
            }}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Selecione a rodada" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todas as rodadas</SelectItem>

              <SelectItem value="1">Rodada 1</SelectItem>
              <SelectItem value="2">Rodada 2</SelectItem>
              <SelectItem value="3">Rodada 3</SelectItem>
              <SelectItem value="16_avos">16 Avos</SelectItem>
              <SelectItem value="oitavas">Oitavas</SelectItem>
              <SelectItem value="quartas">Quartas</SelectItem>
              <SelectItem value="semis">Semis</SelectItem>
              <SelectItem value="final">Final</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rodada</TableHead>
              <TableHead>Seleção 1</TableHead>
              <TableHead>Placar</TableHead>
              <TableHead>Seleção 2</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {matches.map((match) => (
              <TableRow key={match.id}>
                <TableCell>{match.round}</TableCell>

                <TableCell>{match.team1.name}</TableCell>

                <TableCell>
                  {match.score1 ?? "-"} x {match.score2 ?? "-"}
                </TableCell>

                <TableCell>{match.team2.name}</TableCell>

                <TableCell>
                  {new Intl.DateTimeFormat("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(match.matchDateTime)}
                </TableCell>

                <TableCell>
                  {match.finished ? (
                    <Badge>Finalizado</Badge>
                  ) : (
                    <Badge variant="secondary">Pendente</Badge>
                  )}
                </TableCell>

                <TableCell>
                  <Button size="sm" onClick={() => setSelectedMatch(match)}>
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <EditMatchDialog
          match={selectedMatch}
          open={!!selectedMatch}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedMatch(null);
            }
          }}
        />
      </div>
    </>
  );
}
