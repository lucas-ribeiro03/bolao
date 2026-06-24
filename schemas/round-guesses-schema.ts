import { z } from "zod";

export const roundGuessesSchema = z.object({
  guesses: z.array(
    z.object({
      matchId: z.string().min(1),

      score1: z.number().int().min(0),

      score2: z.number().int().min(0),
    }),
  ),
});

export type RoundGuessesSchema = z.infer<typeof roundGuessesSchema>;
