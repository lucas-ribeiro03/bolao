import { prisma } from "@/prisma/prisma";

export async function deleteTeam(id: string) {
  return prisma.team.delete({
    where: {
      id,
    },
  });
}
