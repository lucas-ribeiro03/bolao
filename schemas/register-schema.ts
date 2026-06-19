import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(6, "Username deve possuir pelo menos 6 caracteres")
    .transform((value) => value.toLowerCase()),

  email: z.email("E-mail inválido"),

  password: z
    .string()
    .min(4, "Senha deve possuir pelo menos 4 caracteres")
    .max(18, "Senha deve possuir no máximo 18 caracteres"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
