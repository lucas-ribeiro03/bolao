import { prisma } from "@/prisma/prisma";

export async function getNextMatch() {
  return await prisma.match.findFirst({
    where: {
      matchDateTime: {
        gte: new Date(),
      },
    },
    select: {
      id: true,
      matchDateTime: true,

      team1: {
        select: {
          name: true,
          flag: true,
        },
      },
      team2: {
        select: {
          name: true,
          flag: true,
        },
      },
      guesses: {
        select: {
          score1: true,
          score2: true,
        },
      },
    },

    orderBy: {
      matchDateTime: "asc",
    },
  });
}
