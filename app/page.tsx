"use client";
import HeroSection from "./components/HomePage/HeroSection";
import ServiceCard from "./components/HomePage/ServiceCard";
import { services } from "../utils/ServiceOverview";
import Container from "./components/Container";
const Home = () => {
  const ourServices = services;
  return (
    <div className="">
      <div className="mb-7">
        <HeroSection />
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
    </div>
  );
};

export default Home;
