import { prisma } from "@/prisma/prisma";

type CreateGuessesParams = {
  userId: string;
  guesses: {
    matchId: string;
    score1: number;
    score2: number;
  }[];
};

export async function createGuesses({ userId, guesses }: CreateGuessesParams) {
  return prisma.guess.createMany({
    data: guesses.map((guess) => ({
      userId,
      matchId: guess.matchId,
      score1: guess.score1,
      score2: guess.score2,
    })),
  });
}
