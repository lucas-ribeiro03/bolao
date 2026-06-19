import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type RankingUser = {
  position: number;
  username: string;
  points: number;
};

type RankingTableProps = {
  ranking: RankingUser[];
};

export function RankingTable({ ranking }: RankingTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Pos.</TableHead>

            <TableHead>Usuário</TableHead>

            <TableHead className="text-right">Pontos</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {ranking.map((user) => (
            <TableRow key={user.username}>
              <TableCell>{user.position}</TableCell>

              <TableCell>{user.username}</TableCell>

              <TableCell className="text-right">{user.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
