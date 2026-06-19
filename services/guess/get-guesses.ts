import { prisma } from "@/prisma/prisma";

export async function getGuesses() {
  return await prisma.guess.findMany({
    include: {
      user: true,
      match: {
        include: {
          team1: true,
          team2: true,
        },
      },
    },
  });
}
