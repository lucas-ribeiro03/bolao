import { prisma } from "@/prisma/prisma";

export async function getGuesses() {
  return await prisma.guess.findMany({
    select: {
      userId: true,
      matchId: true,
      score1: true,
      score2: true,
    },
  });
}
