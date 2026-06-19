import { prisma } from "@/prisma/prisma";

export async function getCurrentRound() {
  const match = await prisma.match.findFirst({
    where: {
      finished: false,
    },
    orderBy: {
      matchDateTime: "asc",
    },
    select: {
      round: true,
    },
  });

  return match?.round ?? "1";
}
