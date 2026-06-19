import { prisma } from "@/prisma/prisma";

export async function getMatchesByRound(round: string) {
  return prisma.match.findMany({
    where: {
      round,
    },
    include: {
      team1: true,
      team2: true,
    },
    orderBy: {
      matchDateTime: "asc",
    },
  });
}
