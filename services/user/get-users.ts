import { prisma } from "@/prisma/prisma";

export async function getUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
    },
  });
}
