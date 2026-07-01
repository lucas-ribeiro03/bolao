// components/guesses/round-guesses.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GuessResult } from "@prisma/client";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

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
  }[];
};

export function RoundGuesses({ guesses }: RoundGuessesProps) {
  return (
    <Suspense fallback={<Loader2Icon className="animate-spin" />}>
      <div className="space-y-4">
        {guesses.map((userGuesses) => (
          <Card key={userGuesses.user.id}>
            <CardHeader>
              <CardTitle>{userGuesses.user.username}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              {userGuesses.guesses.map((guess) => (
                <div
                  key={guess.id}
                  className={`flex items-center justify-between ${guess.result === "EXACT_SCORE" ? "bg-green-800" : guess.result === "WINNER" ? "bg-amber-600" : guess.result === "WRONG" ? "bg-red-700" : null} px-2 py-1.5 rounded-sm`}
                >
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
    </Suspense>
  );
}
