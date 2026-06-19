"use server";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateRanking } from "@/lib/calculate-ranking";
import { getGuesses } from "@/services/guess/get-guesses";
import { getMatches } from "@/services/match/get-matches";
import { getUsers } from "@/services/user/get-users";

export default async function RankingTable() {
  const [users, guesses, matches] = await Promise.all([
    getUsers(),
    getGuesses(),
    getMatches(),
  ]);

  const ranking = calculateRanking({
    users,
    guesses,
    matches,
  });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Posição</TableHead>
          <TableHead>Usuário</TableHead>
          <TableHead>Pontos</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {ranking.map((user, index) => (
          <TableRow key={user.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
