// app/(private)/guesses/page.tsx

import { auth } from "@/lib/auth";

import { getCurrentRound } from "@/services/match/get-current-round";
import { getCurrentRoundMatches } from "@/services/match/get-current-round-matches";

import { hasUserGuessedRound } from "@/services/guess/has-user-guessed-round";
import { getRoundGuesses } from "@/services/guess/get-round-guesses";

import { GuessForm } from "@/components/guess/create-guess-form";
import { RoundGuesses } from "@/components/guess/round-guesses";

export default async function GuessesPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const currentRound = await getCurrentRound();

  const alreadyGuessed = await hasUserGuessedRound(
    session.user.id,
    currentRound,
  );

  if (!alreadyGuessed) {
    const matches = await getCurrentRoundMatches();

    return <GuessForm matches={matches} />;
  }

  const guesses = await getRoundGuesses(currentRound);

  return <RoundGuesses guesses={guesses} />;
}
