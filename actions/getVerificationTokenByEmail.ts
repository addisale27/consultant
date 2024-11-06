import prisma from "@/libs/prismadb";

export async function genertateVerificationTokenByEmail(email: string) {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return verificationToken;
  } catch (error) {
    console.log(error);
  }
}
