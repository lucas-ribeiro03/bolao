import { prisma } from "@/prisma/prisma";

type CreateUserParams = {
  username: string;
  email: string;
  password: string;
};

export async function createUser({
  username,
  email,
  password,
}: CreateUserParams) {
  return prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
}
