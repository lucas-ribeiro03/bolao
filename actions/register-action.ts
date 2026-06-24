"use server";

import bcrypt from "bcryptjs";

import { createUser } from "@/services/user/create-user";
import { getUserByEmail } from "@/services/user/get-user-by-email";
import { getUserByUsername } from "@/services/user/get-user-by-username";

import { registerSchema } from "@/schemas/register-schema";
import { updateTag } from "next/cache";

export async function registerAction(formData: FormData) {
  const values = registerSchema.parse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const existingEmail = await getUserByEmail(values.email);

  if (existingEmail) {
    return {
      success: false,
      message: "E-mail já cadastrado.",
    };
  }

  const existingUsername = await getUserByUsername(values.username);

  if (existingUsername) {
    return {
      success: false,
      message: "Username já está em uso.",
    };
  }

  const passwordHash = await bcrypt.hash(values.password, 10);

  await createUser({
    username: values.username,
    email: values.email,
    password: passwordHash,
  });

  updateTag("users");

  return {
    success: true,
    message: "Usuário criado com sucesso.",
  };
}
