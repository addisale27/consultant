import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password)
          throw new Error("Invalid Email or Password!");
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid Email or Password!");
        }
        if (!user.active)
          throw new Error("This has not been activated, please activate it.");
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) throw new Error("Invalid Email or Password!");
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      // Check if the account is Google and if the user exists, create one if not
      if (account?.provider === "google") {
        if (!user.email) {
          throw new Error("Google user does not have a valid email.");
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! }, // We ensure user.email is not null here
        });

        if (!existingUser) {
          // Create a new user for Google sign-in
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name || "Google User",
              image: user.image || "",
              active: true, // Make sure to set active to true or as needed
              hashedPassword: null, // No password needed for Google sign-in
            },
          });
        }
      }

      // If the user is signing in with credentials, proceed normally
      if (account?.provider === "credentials" && !user.active) {
        return false; // Prevent sign-in if the user is inactive
      }

      return true; // Allow sign-in for active users
    },
    async session({ session, user }) {
      // Add custom properties to the session
      if (session?.user) {
        session.user.id = user.id;
        session.user.email = user.email;
        session.user.active = user.active;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url === baseUrl || url.startsWith(baseUrl)) {
        return baseUrl; // Redirect to home or any other page
      }
      return url;
    },
  },
};

export default NextAuth(authOptions);
