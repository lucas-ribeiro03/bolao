import { prisma } from "@/prisma/prisma";

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}
