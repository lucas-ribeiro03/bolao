import { prisma } from "@/prisma/prisma";

export async function getCurrentRound() {
  const settings = await prisma.settings.findFirst();

  return settings?.currentRound ?? null;
}
