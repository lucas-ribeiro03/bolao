import { prisma } from "@/prisma/prisma";

export async function getGuessByUserAndMatch(userId: string, matchId: string) {
  return await prisma.guess.findUnique({
    where: {
      userId_matchId: {
        userId,
        matchId,
      },
    },

    select: {
      score1: true,
      score2: true,
    },
  });
}
