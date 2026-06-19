import { prisma } from "@/prisma/prisma";

type Input = {
  matchId: string;
  score1: number;
  score2: number;
  finished: boolean;
};

export async function updateMatch({
  matchId,
  score1,
  score2,
  finished,
}: Input) {
  return prisma.match.update({
    where: {
      id: matchId,
    },
    data: {
      score1,
      score2,
      finished,
    },
  });
}
