import { countryForJob } from "@/utils/countryDetails";
import CountryFlag from "./CountryFlag";
import Container from "@/app/components/Container";

interface IPrams {
  country_name?: string;
}

const Country = ({ params }: { params: IPrams }) => {
  console.log(params.country_name);

  return (
    <div>
      <div>
        <CountryFlag
          flagUrl={countryForJob.flag_url}
          countryName={countryForJob.name}
        />
      </div>
      <Container>
        <div>
          <div className="flex flex-col gap-8 p-5">
            <div className="text-red-700 text-3xl md:text-4xl font-bold text-center">
              {countryForJob.title}
            </div>
            <div>{countryForJob.introduction}</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Country;
