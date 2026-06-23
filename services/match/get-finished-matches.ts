// import { prisma } from "@/prisma/prisma";

// export async function getFinishedMatches() {
//   return prisma.match.findMany({
//     where: {
//       finished: true,
//     },
//     include: {
//       team1: true,
//       team2: true,
//     },
//     orderBy: {
//       matchDateTime: "desc",
//     },
//   });
// }
