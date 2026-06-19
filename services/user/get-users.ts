import { prisma } from "@/prisma/prisma";

export async function getUsers() {
  return prisma.user.findMany({});
}
