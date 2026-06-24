"use cache";

import { prisma } from "@/prisma/prisma";
import { cacheTag } from "next/cache";

export async function getCurrentRound() {
  cacheTag("current-round");
  const settings = await prisma.settings.findFirst();

  return settings?.currentRound ?? null;
}
