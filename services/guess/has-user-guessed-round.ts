import { prisma } from "@/prisma/prisma";

export async function hasUserGuessedRound(userId: string, round: string) {
  const count = await prisma.guess.count({
    where: {
      userId,
      match: {
        round,
      },
    },
  });

  return count > 0;
}
