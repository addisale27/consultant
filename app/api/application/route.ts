import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const body = await request.json();
  const {
    fullName,
    email,
    phoneNumber,
    type,
    field,
    passportImage,
    birthCerteficateImage,
    educationalBackground,
  } = body;

  // Create application associated with the current user
  const application = await prisma.application.create({
    data: {
      fullName,
      email,
      phoneNumber,
      type,
      field,
      passportImage,
      birthCerteficateImage,
      educationalBackground,
      userId: currentUser.id, // Link the application to the current user
    },
  });

  return NextResponse.json(application);
}
