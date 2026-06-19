"use server";

import bcrypt from "bcryptjs";

import { getUserByEmail } from "@/services/user/get-user-by-email";
import { signIn } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    console.log("Dados inválidos");
    return {
      success: false,
    };
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return {
      success: false,
    };
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return {
      success: false,
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      success: true,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
    };
  }
}
