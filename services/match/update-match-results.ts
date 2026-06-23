// import { prisma } from "@/prisma/prisma";

// type UpdateMatchResultParams = {
//   matchId: string;
//   score1: number;
//   score2: number;
// };

// export async function updateMatchResult({
//   matchId,
//   score1,
//   score2,
// }: UpdateMatchResultParams) {
//   const match = await prisma.match.update({
//     where: {
//       id: matchId,
//     },
//     data: {
//       score1,
//       score2,
//       finished: true,
//     },
//   });

//   const guesses = await prisma.guess.findMany({
//     where: {
//       matchId,
//     },
//   });

//   await Promise.all(
//     guesses.map(async (guess) => {
//       let result: "EXACT_SCORE" | "WINNER" | "WRONG";

//       if (guess.score1 === score1 && guess.score2 === score2) {
//         result = "EXACT_SCORE";
//       } else if (
//         (guess.score1 > guess.score2 && score1 > score2) ||
//         (guess.score1 < guess.score2 && score1 < score2) ||
//         (guess.score1 === guess.score2 && score1 === score2)
//       ) {
//         result = "WINNER";
//       } else {
//         result = "WRONG";
//       }

//       return prisma.guess.update({
//         where: {
//           id: guess.id,
//         },
//         data: {
//           result,
//         },
//       });
//     }),
//   );

//   return match;
// }
