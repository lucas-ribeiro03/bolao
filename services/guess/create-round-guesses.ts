import { prisma } from "@/prisma/prisma";

type CreateRoundGuessesParams = {
  userId: string;
  guesses: {
    matchId: string;
    score1: number;
    score2: number;
  }[];
};

export async function createRoundGuesses({
  userId,
  guesses,
}: CreateRoundGuessesParams) {
  return prisma.guess.createMany({
    data: guesses.map((guess) => ({
      userId,
      matchId: guess.matchId,
      score1: guess.score1,
      score2: guess.score2,
    })),
  });
}
