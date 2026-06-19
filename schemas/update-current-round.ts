import { z } from "zod";

export const updateCurrentRoundSchema = z.object({
  currentRound: z.string().min(1).max(12),
});

export type UpdateCurrentRoundSchema = z.infer<typeof updateCurrentRoundSchema>;
