import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      email: "Credentials",
      async authorize(credentials) {
        await connect();

        try {
          const user = await User.findOne({ userName: credentials.userName });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.userPassword,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong credentials!");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  pages: {
    error: "/login",
  },
  callbacks: {},
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
