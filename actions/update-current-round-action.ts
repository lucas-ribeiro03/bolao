// actions/update-current-round-action.ts

"use server";

import { revalidatePath, updateTag } from "next/cache";

import { updateCurrentRoundSchema } from "@/schemas/update-current-round";

import { updateCurrentRound } from "@/services/settings/update-current-round";

export async function updateCurrentRoundAction(data: FormData) {
  const parsed = updateCurrentRoundSchema.safeParse({
    currentRound: data.get("currentRound"),
  });

  if (!parsed.success) {
    return {
      success: false,
    };
  }

  await updateCurrentRound({ currentRound: parsed.data.currentRound });

  revalidatePath("/");
  revalidatePath("/guesses");
  revalidatePath("/admin/settings");
  updateTag("current-round");
  updateTag("system-settings");
  updateTag("current-round-matches");
  updateTag("matches");

  return {
    success: true,
  };
}
