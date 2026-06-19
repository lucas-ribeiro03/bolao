import { prisma } from "@/prisma/prisma";

export async function getNextMatch() {
  return await prisma.match.findFirst({
    where: {
      matchDateTime: {
        gte: new Date(),
      },
    },
    include: {
      team1: true,
      team2: true,
    },
    orderBy: {
      matchDateTime: "asc",
    },
  });
}
