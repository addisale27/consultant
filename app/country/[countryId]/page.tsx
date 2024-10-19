import CountryFlag from "./CountryFlag";
import Container from "@/app/components/Container";
import JobTypeSwiper from "@/app/components/jobType/JobTypeSwiper";
import { jobTypes } from "@/utils/jobTypes";
import { getScholarshipById } from "@/actions/getScholarshipById";

interface ICountryParams {
  countryId?: string | null;
}

const Country = async ({ params }: { params: ICountryParams }) => {
  const { countryId } = params;

  // Check if `countryId` is provided; handle undefined safely
  if (!countryId) {
    return <p>No country ID provided.</p>;
  }

  // Fetch the country details using the provided `countryId`
  const countryDetails = await getScholarshipById({ scholarshipId: countryId });

  if (!countryDetails) {
    return (
      <p className="font-semibold justify-center items-center text-red-500 text-2xl">
        There is no country available.
      </p>
    );
  }

  return (
    <div>
      {/* Render Country Flag */}
      <div>
        <CountryFlag
          flagUrl={countryDetails.flag_url}
          countryName={countryDetails.name}
        />
      </div>

      {/* Render Main Content inside Container */}
      <Container>
        <div className="flex flex-col gap-8 p-5">
          <div className="text-red-700 text-3xl md:text-4xl font-bold text-center">
            {countryDetails.title}
          </div>
          <div>{countryDetails.introduction}</div>
        </div>

        {/* Render Job Types Swiper */}
        <JobTypeSwiper jobType={jobTypes} countryName={countryDetails.name} />
      </Container>
    </div>
  );
};

export default Country;
