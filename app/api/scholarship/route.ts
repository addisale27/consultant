import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();

    // Check if the user is an admin
    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only Admin can add Scholarship" },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { name, title, introduction, flag_url } = body;

    // Validate required fields
    if (!name || !title || !introduction || !flag_url) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a new scholarship record
    const scholarship = await prisma.scholarships.create({
      data: {
        name,
        title,
        introduction,
        flag_url,
      },
    });

    // Return the created scholarship
    return NextResponse.json(scholarship, { status: 201 });
  } catch (error) {
    console.error("Error creating scholarship:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the scholarship" },
      { status: 500 }
    );
  }
}
