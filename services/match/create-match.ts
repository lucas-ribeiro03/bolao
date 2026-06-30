import { prisma } from "@/prisma/prisma";

interface CreateMatchParams {
  team1Id: string;
  team2Id: string;
  round: string;
  matchDateTime: Date;
}

export async function createMatch({
  team1Id,
  team2Id,
  round,
  matchDateTime,
}: CreateMatchParams) {
  return prisma.match.create({
    data: {
      team1Id,
      team2Id,
      round,
      matchDateTime,
      score1: 0,
      score2: 0,
    },
    select: {
      id: true,
      round: true,
      matchDateTime: true,
    },
  });
}
