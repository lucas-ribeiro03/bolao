"use server";

import { auth } from "@/lib/auth";

import { getCurrentRoundMatches } from "@/services/match/get-current-round-matches";
import { hasUserGuessedRound } from "@/services/guess/has-user-guessed-round";
import { createRoundGuesses } from "@/services/guess/create-round-guesses";

type GuessInput = {
  matchId: string;
  score1: number;
  score2: number;
};

export async function createRoundGuessesAction(guesses: GuessInput[]) {
  const session = await auth();

  if (!session?.user) {
    return {
      success: false,
      message: "Usuário não autenticado.",
    };
  }

  const matches = await getCurrentRoundMatches();

  if (matches.length === 0) {
    return {
      success: false,
      message: "Nenhuma rodada disponível.",
    };
  }

  const firstMatch = matches[0];

  const lockDate = new Date(
    firstMatch.matchDateTime.getTime() - 10 * 60 * 1000,
  );

  const now = new Date(new Date().getTime() - 18 * 10 * 60 * 1000);

  console.log("Limite:", lockDate);
  console.log("Agora:", now);

  if (now >= lockDate) {
    return {
      success: false,
      message: "O prazo para envio dos palpites foi encerrado.",
    };
  }

  const alreadyGuessed = await hasUserGuessedRound(
    session.user.id!,
    firstMatch.round,
  );

  if (alreadyGuessed) {
    return {
      success: false,
      message: "Você já enviou seus palpites para esta rodada.",
    };
  }

  if (guesses.length !== matches.length) {
    return {
      success: false,
      message: "Todos os jogos devem possuir um palpite.",
    };
  }

  await createRoundGuesses({
    userId: session.user.id!,
    guesses,
  });

  return {
    success: true,
    message: "",
  };
}
