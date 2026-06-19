import "dotenv/config";
import { prisma } from "./prisma";
import { GuessResult } from "@/app/generated/prisma/enums";

const guessResult = GuessResult;

export const guesses = [
  {
    matchId: "c1158887-b3a0-4cc0-99f0-304eca2344da",
    result: guessResult.EXACT_SCORE,
    score1: 2,
    score2: 0,
    userId: "a795333b-5e27-473c-8a32-41546bde6a26",
  },
  {
    matchId: "6f042405-675b-43f4-aaa5-28579bd151cc",
    result: guessResult.EXACT_SCORE,
    score1: 1,
    score2: 1,
    userId: "a795333b-5e27-473c-8a32-41546bde6a26",
  },
  {
    matchId: "8adfba4b-ff99-4a77-bb5a-5db80839124a",
    result: guessResult.WINNER,
    score1: 4,
    score2: 0,
    userId: "a795333b-5e27-473c-8a32-41546bde6a26",
  },
  {
    matchId: "c99fdf97-aad2-43ba-877c-ac5f9b2214e1",
    result: guessResult.WRONG,
    score1: 2,
    score2: 1,
    userId: "a795333b-5e27-473c-8a32-41546bde6a26",
  },
  {
    matchId: "bb4ee23f-00e3-4bdb-ba85-bb4afc31ab01",
    result: guessResult.WRONG,
    score1: 5,
    score2: 0,
    userId: "a795333b-5e27-473c-8a32-41546bde6a26",
  },
  {
    matchId: "cf9c8a90-7710-49e8-9ae4-99eada1bcec8",
    result: guessResult.WRONG,
    score1: 3,
    score2: 1,
    userId: "a795333b-5e27-473c-8a32-41546bde6a26",
  },
  {
    matchId: "24bb422d-a70f-462a-b6b3-565b61e150dd",
    result: guessResult.EXACT_SCORE,
    score1: 1,
    score2: 1,
    userId: "a795333b-5e27-473c-8a32-41546bde6a26",
  },
  {
    matchId: "81187e8e-d751-4e48-bbc7-a985430ec5be",
    result: guessResult.EXACT_SCORE,
    score1: 3,
    score2: 1,
    userId: "a795333b-5e27-473c-8a32-41546bde6a26",
  },
  {
    matchId: "095fec92-e6de-42a7-b67e-d966e8f1673f",
    result: guessResult.WRONG,
    score1: 6,
    score2: 0,
    userId: "a795333b-5e27-473c-8a32-41546bde6a26",
  },
  {
    matchId: "1ace60f0-4a7e-4bfa-b7e3-c6f13b7e3a27",
    result: guessResult.WINNER,
    score1: 3,
    score2: 1,
    userId: "a795333b-5e27-473c-8a32-41546bde6a26",
  },
  {
    matchId: "8393d472-f3e0-4528-bf6f-983ebd37ec2c",
    result: guessResult.EXACT_SCORE,
    score1: 3,
    score2: 0,
    userId: "a795333b-5e27-473c-8a32-41546bde6a26",
  },
];

async function main() {
  await prisma.guess.createMany({
    data: guesses,
  });

  console.log("Guesses criados com sucesso.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
