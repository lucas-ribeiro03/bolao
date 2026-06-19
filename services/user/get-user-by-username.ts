import { prisma } from "@/prisma/prisma";

export async function getUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
}
