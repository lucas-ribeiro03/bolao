import { z } from "zod";

export const updateMatchSchema = z.object({
  matchId: z.string(),

  score1: z.number().min(0),

  score2: z.number().min(0),

  finished: z.boolean(),
});

export type UpdateMatchSchema = z.infer<typeof updateMatchSchema>;
