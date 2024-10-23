import HeroSection from "./components/HomePage/HeroSection";
import Container from "./components/Container";
import Testimonial from "./components/HomePage/Testimonial";
import DynamicHeroSection from "./components/HomePage/DynamicHeroSection";
import CountryList from "./components/HomePage/CountryList";
import SubBanner from "./components/HomePage/SubBanner";
import HowItWorks from "./components/HomePage/HowItWorks";

import { getScholarships } from "@/actions/getScholarships";

const Home = async () => {
  const allScholarships = await getScholarships(); // Fetch scholarships
  console.log(allScholarships);
  return (
    <div className="flex flex-col">
      <div>
        {/* Show HeroSection only on screens smaller than 'md' */}
        <div className="md:hidden">
          <HeroSection />
        </div>

        {/* Show DynamicHeroSection only on 'md' and larger screens */}
        <div className="hidden md:block">
          <DynamicHeroSection />
        </div>
      </div>
      <div className="bg-slate-200 p-6">
        <Container>
          <div className="mt-11 md:mt-[100px] xl:mt-[120px] mb-7">
            <CountryList country={allScholarships} />
          </div>
          {/* Render the scholarships here */}
        </Container>
      </div>

      <div>
        <SubBanner />
      </div>
      <div className="mt-7">
        <HowItWorks />
      </div>

      <div className="mt-7 md:mt-[100px]">
        <Container>
          <Testimonial />
        </Container>
      </div>
    </div>
  );
};

export default Home;
