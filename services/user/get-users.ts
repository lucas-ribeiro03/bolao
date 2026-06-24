"use cache";

import { prisma } from "@/prisma/prisma";
import { cacheTag } from "next/cache";

export async function getUsers() {
  cacheTag("users");
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
    },
  });
}
