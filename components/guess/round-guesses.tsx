// components/guesses/round-guesses.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RoundGuessesProps = {
  guesses: {
    user: {
      id: string;
      username: string;
    };
    guesses: {
      id: string;
      score1: number;
      score2: number;
      match: {
        team1: {
          name: string;
        };
        team2: {
          name: string;
        };
      };
    }[];
  }[];
};

export function RoundGuesses({ guesses }: RoundGuessesProps) {
  return (
    <div className="space-y-4">
      {guesses.map((userGuesses) => (
        <Card key={userGuesses.user.id}>
          <CardHeader>
            <CardTitle>{userGuesses.user.username}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            {userGuesses.guesses.map((guess) => (
              <div key={guess.id} className="flex items-center justify-between">
                <span>
                  {guess.match.team1.name} x {guess.match.team2.name}
                </span>

                <span className="font-semibold">
                  {guess.score1} x {guess.score2}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
