"use server";

import { revalidatePath } from "next/cache";

import { createMatchSchema } from "@/schemas/create-match-schema";
import { createMatch } from "@/services/match/create-match";

export async function createMatchAction(formData: FormData) {
  const parsed = createMatchSchema.safeParse({
    team1Id: formData.get("team1Id"),
    team2Id: formData.get("team2Id"),
    round: formData.get("round"),
    matchDateTime: new Date(String(formData.get("matchDateTime"))),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Dados inválidos.",
    };
  }

  const { team1Id, team2Id } = parsed.data;

  if (team1Id === team2Id) {
    return {
      success: false,
      message: "As seleções devem ser diferentes.",
    };
  }

  try {
    await createMatch(parsed.data);

    revalidatePath("/admin/matches");

    return {
      success: true,
      message: "Partida criada com sucesso.",
    };
  } catch {
    return {
      success: false,
      message: "Erro ao criar partida.",
    };
  }
}
