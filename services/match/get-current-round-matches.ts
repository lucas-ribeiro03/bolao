"use cache";

import { prisma } from "@/prisma/prisma";
import { cacheTag } from "next/cache";

export async function getCurrentRoundMatches() {
  cacheTag("current-round-matches");
  const settings = await prisma.settings.findFirst();

  if (!settings) {
    throw new Error("Configurações não encontradas.");
  }

  return prisma.match.findMany({
    where: {
      round: settings.currentRound,
    },
    select: {
      id: true,
      team1: true,
      team2: true,
      matchDateTime: true,
      round: true,
    },
    orderBy: {
      matchDateTime: "asc",
    },
  });
}
