import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("E-mail inválido"),

  password: z
    .string()
    .min(4, "Senha deve possuir pelo menos 4 caracteres")
    .max(18, "Senha deve possuir no máximo 18 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
