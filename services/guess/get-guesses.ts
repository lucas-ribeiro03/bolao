"use cache";

import { prisma } from "@/prisma/prisma";
import { cacheTag } from "next/cache";

export async function getGuesses() {
  cacheTag("guesses");
  return await prisma.guess.findMany({
    select: {
      userId: true,
      matchId: true,
      score1: true,
      score2: true,
    },
  });
}
