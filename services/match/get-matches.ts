import { prisma } from "@/prisma/prisma";

type GetAllMatchesParams = {
  round?: string;
};

export async function getMatches({ round }: GetAllMatchesParams = {}) {
  return prisma.match.findMany({
    where: {
      ...(round && { round }),
    },
    include: {
      team1: true,
      team2: true,
    },
    orderBy: [
      {
        round: "asc",
      },
      {
        matchDateTime: "asc",
      },
    ],
  });
}
