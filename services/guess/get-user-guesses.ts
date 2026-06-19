import { prisma } from "@/prisma/prisma";

export async function getUserGuesses(userId: string) {
  return prisma.guess.findMany({
    where: {
      userId,
    },
    include: {
      match: {
        include: {
          team1: true,
          team2: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
