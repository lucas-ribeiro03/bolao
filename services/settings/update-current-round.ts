import { prisma } from "@/prisma/prisma";

type UpdateCurrentRoundParams = {
  currentRound: string;
};

export async function updateCurrentRound({
  currentRound,
}: UpdateCurrentRoundParams) {
  const settings = await prisma.settings.findFirst();

  if (!settings) {
    return prisma.settings.create({
      data: {
        currentRound,
      },
    });
  }

  return prisma.settings.update({
    where: {
      id: settings.id,
    },
    data: {
      currentRound,
    },
  });
}
