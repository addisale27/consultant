import prisma from "@/libs/prismadb"; // Import the Prisma client instance
import { Prisma, Scholarship } from "@prisma/client"; // Import Prisma types

export interface IScholarshipParams {
  searchTerm?: string | null;
  category?: string | null; // If you want to filter by category, you might need to add a category field in your model
}

export async function getScholarships(
  params: IScholarshipParams
): Promise<Scholarship[]> {
  try {
    const { category, searchTerm } = params;

    // Define the type-safe query object.
    const query: Prisma.ScholarshipWhereInput = {
      ...(category ? { category } : {}), // Assuming you might add a category field later
      ...(searchTerm
        ? {
            OR: [
              { name: { contains: searchTerm, mode: "insensitive" } },
              { sch_title: { contains: searchTerm, mode: "insensitive" } },
              {
                sch_introduction: { contains: searchTerm, mode: "insensitive" },
              },
              { job_title: { contains: searchTerm, mode: "insensitive" } },
              {
                job_introduction: { contains: searchTerm, mode: "insensitive" },
              },
            ],
          }
        : {}),
    };

    // Query the database with the built query.
    const scholarships = await prisma.scholarship.findMany({
      where: query,
      // Optionally, you can select specific fields if necessary
      // select: {
      //   id: true,
      //   name: true,
      //   sch_title: true,
      //   sch_introduction: true,
      //   job_title: true,
      //   job_introduction: true,
      //   flag_url: true,
      //   card_url: true,
      //   // Add other fields as needed
      // },
    });

    return scholarships;
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    throw new Error("Failed to retrieve scholarships");
  }
}
