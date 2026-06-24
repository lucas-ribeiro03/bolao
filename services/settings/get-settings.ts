"use cache";
import { prisma } from "@/prisma/prisma";
import { cacheTag } from "next/cache";

export async function getSettings() {
  cacheTag("system-settings");
  return prisma.settings.findFirst();
}
