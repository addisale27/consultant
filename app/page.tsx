"use client";

import HeroSection from "./components/HomePage/HeroSection";
import ServiceCard from "./components/HomePage/ServiceCard";
import { services } from "../utils/ServiceOverview";
import Container from "./components/Container";
import Testimonial from "./components/HomePage/Testimonial";
import FAQS from "./components/HomePage/FAQS";
import DynamicHeroSection from "./components/HomePage/DynamicHeroSection";

const Home = () => {
  const ourServices = services;
  return (
    <div className="">
      <div className="mb-7">
        {/* Show HeroSection only on screens smaller than 'md' */}
        <div className="md:hidden">
          <HeroSection />
        </div>

        {/* Show DynamicHeroSection only on 'md' and larger screens */}
        <div className="hidden md:block">
          <DynamicHeroSection />
        </div>
      </div>

      <div className="p-8">
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
      </div>

      <div className="mt-10 md:mt-[100px]">
        <Container>
          <Testimonial />
        </Container>
      </div>

      <div className="mt-10 md:mt-[100px]">
        <Container>
          <FAQS />
        </Container>
      </div>
    </div>
  );
};

export default Home;
