import { prisma } from "@/prisma/prisma";

export async function getNextMatches() {
  return prisma.match.findMany({
    where: {
      finished: false,
    },
    include: {
      team1: true,
      team2: true,
    },
    orderBy: {
      matchDateTime: "asc",
    },
    take: 5,
  });
}
