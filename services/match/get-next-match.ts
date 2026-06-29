"use cache";
import { prisma } from "@/prisma/prisma";
import { cacheTag } from "next/cache";

export async function getNextMatch() {
  cacheTag("next-match");
  return await prisma.match.findFirst({
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
