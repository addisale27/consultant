import prisma from "@/libs/prismadb";

interface IParams {
  scholarshipId?: string | null; // Allow null in case of missing id
}

export async function getScholarshipById(params: IParams) {
  try {
    const { scholarshipId } = params;

    // Check if scholarshipId is provided
    if (!scholarshipId) {
      console.error("No scholarship ID provided");
      return null; // Return null if no ID is given
    }

    // Fetch the scholarship record from the database
    const scholarship = await prisma.scholarships.findUnique({
      where: {
        id: scholarshipId,
      },
    });
    if (!scholarship) return null;
    // Return scholarship or null if not found
    return scholarship;
  } catch (error) {
    console.error("Error fetching scholarship:", error);
  }
}
