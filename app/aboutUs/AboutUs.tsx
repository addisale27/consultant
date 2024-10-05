import { AiOutlineInfoCircle } from "react-icons/ai";
import Sections from "./Mission";
import VisionSection from "./Vission";
import CoreValues from "./CoreValues";
import WhatWeDo from "./WhatWeDo";
import WhyChooseUs from "./WhyChooseUs";
import MeetOurTeam from "./MeetOurTeam";

const AboutUsComponent = () => {
  return (
    <div>
      <header className=" flex justify-center items-center  py-8">
        <div className=" flex-row-reverse flex items-center gap-2">
          <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
          <span className="bg-blue-700 w-[50px] h-[50px] rounded-full flex items-center justify-center">
            <span className="text-white">
              <AiOutlineInfoCircle size={24} />
            </span>
          </span>
        </div>
      </header>
      <div className="">
        {/* First Section: Aligned Left */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start my-6">
          <div className="lg:w-1/2 order-1 lg:order-1">
            <Sections />
          </div>
        </div>

        {/* Second Section: Aligned Right */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start my-6">
          <div className="lg:w-1/2 order-2 lg:order-2 lg:ml-auto">
            <VisionSection />
          </div>
        </div>

        {/* Third Section: Aligned Left */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start my-6">
          <div className="lg:w-1/2 order-1 lg:order-1">
            <CoreValues />
          </div>
        </div>

        {/* Fourth Section: Aligned Right */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start my-6">
          <div className="lg:w-1/2 order-2 lg:order-2 lg:ml-auto">
            <WhatWeDo />
          </div>
        </div>

        {/* Fifth Section: Aligned Left */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start my-6">
          <div className="lg:w-1/2 order-1 lg:order-1">
            <WhyChooseUs />
          </div>
        </div>
      </div>
      <MeetOurTeam />
    </div>
  );
};

export default AboutUsComponent;
