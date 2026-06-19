// service/guess/update-match-guesses.ts
import { GuessResult } from "@prisma/client";

import { prisma } from "@/prisma/prisma";

export async function updateMatchGuesses(matchId: string) {
  const match = await prisma.match.findUnique({
    where: {
      id: matchId,
    },
  });

  if (!match) {
    throw new Error("Partida não encontrada.");
  }

  const guesses = await prisma.guess.findMany({
    where: {
      matchId,
    },
  });

  const updates = guesses.map((guess) => {
    let result: GuessResult = GuessResult.WRONG;

    const exactScore =
      guess.score1 === match.score1 && guess.score2 === match.score2;

    if (exactScore) {
      result = GuessResult.EXACT_SCORE;
    } else {
      const guessOutcome =
        guess.score1 > guess.score2
          ? "TEAM1"
          : guess.score1 < guess.score2
            ? "TEAM2"
            : "DRAW";

      const matchOutcome =
        match.score1! > match.score2!
          ? "TEAM1"
          : match.score1! < match.score2!
            ? "TEAM2"
            : "DRAW";

      if (guessOutcome === matchOutcome) {
        result = GuessResult.WINNER;
      }
    }

    return prisma.guess.update({
      where: {
        id: guess.id,
      },
      data: {
        result,
      },
    });
  });

  await prisma.$transaction(updates);
}
