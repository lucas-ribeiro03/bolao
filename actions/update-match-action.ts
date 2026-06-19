"use server";

import { revalidatePath } from "next/cache";

import { updateMatchSchema } from "@/schemas/update-match-schema";

import { updateMatch } from "@/services/match/update-match";
import { updateMatchGuesses } from "@/services/guess/update-match-guesses";

type Input = {
  matchId: string;
  score1: number;
  score2: number;
  finished: boolean;
};

export async function updateMatchAction(data: Input) {
  const parsed = updateMatchSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Dados inválidos.",
    };
  }

  const match = await updateMatch(parsed.data);

  if (parsed.data.finished) {
    await updateMatchGuesses(parsed.data.matchId);
  }

  revalidatePath("/");
  revalidatePath("/admin/matches");
  revalidatePath("/guesses");

  return {
    success: true,
    match,
  };
}
