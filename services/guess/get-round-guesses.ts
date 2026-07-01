import { prisma } from "@/prisma/prisma";
import { GuessResult } from "@prisma/client";

type RoundGuesses = {
  user: {
    id: string;
    username: string;
  };
  guesses: {
    id: string;
    score1: number;
    score2: number;
    result: GuessResult;
    match: {
      team1: {
        name: string;
      };
      team2: {
        name: string;
      };
    };
  }[];
};

export async function getRoundGuesses(round: string): Promise<RoundGuesses[]> {
  const guesses = await prisma.guess.findMany({
    where: {
      match: {
        round,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      match: {
        include: {
          team1: true,
          team2: true,
        },
      },
    },

    orderBy: {
      match: {
        matchDateTime: "asc",
      },
    },
  });

  const grouped = guesses.reduce<
    Record<
      string,
      {
        user: {
          id: string;
          username: string;
        };
        guesses: typeof guesses;
      }
    >
  >((acc, guess) => {
    const userId = guess.user.id;

    if (!acc[userId]) {
      acc[userId] = {
        user: guess.user,
        guesses: [],
      };
    }

    acc[userId].guesses.push(guess);

    return acc;
  }, {});

  return Object.values(grouped);
}
