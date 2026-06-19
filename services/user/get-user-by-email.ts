import { prisma } from "@/prisma/prisma";

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}
