import { prisma } from "@/prisma/prisma";

type GetAllMatchesParams = {
  round?: string;
};

export async function getMatches({ round }: GetAllMatchesParams = {}) {
  return prisma.match.findMany({
    where: {
      ...(round && { round }),
    },
    select: {
      id: true,
      score1: true,
      score2: true,
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
