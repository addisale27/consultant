import prisma from "@/libs/prismadb"; // This imports the Prisma client instance
import { Prisma } from "@prisma/client"; // Import Prisma types correctly

export interface IScholarshipParams {
  searchTerm?: string | null;
  category?: string | null;
}

export async function getScholarships(params: IScholarshipParams) {
  try {
    const { category, searchTerm } = params;

    // Define the type-safe query object.
    const query: Prisma.ScholarshipsWhereInput = {
      ...(category ? { category } : {}), // Add category only if provided.
      ...(searchTerm
        ? {
            OR: [
              { name: { contains: searchTerm, mode: "insensitive" } },
              { introduction: { contains: searchTerm, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    // Query the database with the built query.
    const scholarships = await prisma.scholarships.findMany({
      where: query,
    });

    return scholarships;
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    throw new Error("Failed to retrieve scholarships");
  }
}
