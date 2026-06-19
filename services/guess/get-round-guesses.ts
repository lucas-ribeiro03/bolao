import { prisma } from "@/prisma/prisma";

export async function getRoundGuesses(round: string) {
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
      user: {
        username: "asc",
      },
    },
  });

  type Guess = (typeof guesses)[number];

  return Object.values(
    guesses.reduce<
      Record<
        string,
        {
          user: {
            id: string;
            username: string;
          };
          guesses: Guess[];
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
    }, {}),
  );
}
