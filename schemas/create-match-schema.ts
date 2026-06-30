import { z } from "zod";

export const createMatchSchema = z
  .object({
    team1Id: z.string().min(1, "Selecione a primeira seleção."),

    team2Id: z.string().min(1, "Selecione a segunda seleção."),

    round: z.string(),

    matchDateTime: z.date(),
  })
  .refine((data) => data.team1Id !== data.team2Id, {
    path: ["team2Id"],
    message: "As seleções devem ser diferentes.",
  });

export type CreateMatchSchema = z.infer<typeof createMatchSchema>;
