"use cache";

import { prisma } from "@/prisma/prisma";
import { cacheTag } from "next/cache";

type GetAllMatchesParams = {
  round?: string;
};

export async function getMatches({ round }: GetAllMatchesParams = {}) {
  cacheTag("matches");
  return prisma.match.findMany({
    where: {
      ...(round && { round }),
    },
    include: {
      team1: true,
      team2: true,
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
