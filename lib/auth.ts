import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { prisma } from "@/prisma/prisma";
import { getUserByEmail } from "@/services/user/get-user-by-email";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [
    Google,

    Credentials({
      name: "credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials?.password !== "string"
        ) {
          return null;
        }

        const user = await getUserByEmail(credentials.email);

        if (!user) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!passwordMatches) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.username = token.username as string;
        session.user.role = token.role as "ADMIN" | "USER";
      }

      return session;
    },
  },
});
