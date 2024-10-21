import HeroSection from "./components/HomePage/HeroSection";
// import ServiceCard from "./components/HomePage/ServiceCard";
//import { services } from "../utils/ServiceOverview";
import Container from "./components/Container";
import Testimonial from "./components/HomePage/Testimonial";
//import FAQS from "./components/HomePage/FAQS";
import DynamicHeroSection from "./components/HomePage/DynamicHeroSection";
import CountryList from "./components/HomePage/CountryList";
import SubBanner from "./components/HomePage/SubBanner";
import HowItWorks from "./components/HomePage/HowItWorks";

import { getScholarships } from "@/actions/getScholarships";

const Home = async () => {
  //const ourServices = services;
  const allScholarships = await getScholarships({});
  return (
    <div className="flex flex-col ">
      <div className="">
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
          <div className=" mt-11 md:mt-[100px] xl:mt-[120px] mb-7">
            <CountryList country={allScholarships} />
          </div>
        </Container>
      </div>

      {/* <span>I am gonna edit the page below this you can use one container component for all of them no need to call many times i think </span> */}
      <div>
        <SubBanner />
      </div>
      <div className="mt-7">
        <div>
          <HowItWorks />
        </div>
      </div>
      {/* <div className="p-8">
        <Container>
          <div className="flex flex-wrap justify-center gap-4 mt-7">
            {ourServices.map((service) => {
              return (
                <div key={service.title} onClick={() => {}}>
                  <ServiceCard serviceOverview={service} />
                </div>
              );
            })}
          </div>
        </Container>
      </div> */}

      <div className="mt-7 md:mt-[100px]  ">
        <Container>
          <Testimonial />
        </Container>
      </div>

      {/* <div className="mt-10 md:mt-[100px]">
        <Container>
          <FAQS />
        </Container>
      </div> */}
    </div>
  );
};

export default Home;
