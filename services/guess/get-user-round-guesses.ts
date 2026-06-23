// import { prisma } from "@/prisma/prisma";

// export async function getUserRoundGuesses(userId: string, round: string) {
//   return prisma.guess.findMany({
//     where: {
//       userId,
//       match: {
//         round,
//       },
//     },
//     include: {
//       match: {
//         include: {
//           team1: true,
//           team2: true,
//         },
//       },
//     },
//     orderBy: {
//       match: {
//         matchDateTime: "asc",
//       },
//     },
//   });
// }
