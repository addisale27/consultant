// getCurrentUser.ts
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";
import { CurrentUser } from "@/app/components/NavgationBar/UserMenu";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (!currentUser) {
      console.log("no sessions");
      return null;
    }

    return {
      id: currentUser.id, // Ensure these match your CurrentUser type
      name: currentUser.name,
      email: currentUser.email,
      emailVerified: currentUser.emailVerified
        ? currentUser.emailVerified.toISOString()
        : null,
      image: currentUser.image,
      role: currentUser.role,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
    } as CurrentUser; // Assert the type here
  } catch (error) {
    console.error(error);
    return null; // Ensure a return value in case of error
  }
}
