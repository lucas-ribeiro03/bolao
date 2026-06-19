import { prisma } from "@/prisma/prisma";

export async function getSettings() {
  return prisma.settings.findFirst();
}
