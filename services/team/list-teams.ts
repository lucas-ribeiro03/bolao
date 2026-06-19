import { prisma } from "@/prisma/prisma";

export async function listTeams() {
  return prisma.team.findMany({
    orderBy: {
      name: "asc",
    },
  });
}
