type User = {
  id: string;
  username: string;
};

type Match = {
  id: string;
  score1: number | null;
  score2: number | null;
  finished: boolean;
};

type Guess = {
  userId: string;
  matchId: string;
  score1: number;
  score2: number;
};

type CalculateRankingParams = {
  users: User[];
  matches: Match[];
  guesses: Guess[];
};

function getWinner(score1: number, score2: number) {
  if (score1 > score2) {
    return "TEAM_1";
  }

  if (score2 > score1) {
    return "TEAM_2";
  }

  return "DRAW";
}

export function calculateRanking({
  users,
  matches,
  guesses,
}: CalculateRankingParams) {
  const ranking = users.map((user) => {
    let points = 0;

    const userGuesses = guesses.filter((guess) => guess.userId === user.id);

    for (const guess of userGuesses) {
      const match = matches.find((match) => match.id === guess.matchId);

      if (!match) {
        continue;
      }

      console.log(match);

      if (
        match.score1 === null ||
        match.score2 === null ||
        match.finished !== true
      ) {
        console.log(match.finished, typeof match.finished);
        continue;
      }

      const exactScore =
        guess.score1 === match.score1 && guess.score2 === match.score2;

      if (exactScore) {
        points += 3;
        continue;
      }

      const guessWinner = getWinner(guess.score1, guess.score2);

      const realWinner = getWinner(match.score1, match.score2);

      if (guessWinner === realWinner) {
        points += 1;
      }
    }

    console.log(points);

    return {
      id: user.id,
      username: user.username,
      points,
    };
  });

  const orderedRanking = ranking
    .sort((a, b) => b.points - a.points)
    .map((user, index) => ({
      ...user,
      position: index + 1,
    }));

  return orderedRanking;
}
