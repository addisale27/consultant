"use client";

import Image from "next/image";
import heroimage from "../../assets/herosectionbg.jpg";
import Button from "../Button";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return (
    <div className="relative bg-gray-900 overflow-hidden ">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroimage}
          fill
          alt="heroimage"
          className="object-cover brightness-50"
        />
      </div>

      <div className="relative  flex p-2 md:px-24 py-12 items-center gap-4   text-white">
        <div className="flex flex-col flex-1 max-w-[700px]  ">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Unlock Your Educational Future With Us!
          </h1>
          <p className="text-lg md:text-xl mb-4 px-12">
            Expert guidance for scholarship applications and university
            selection.
          </p>

          <h2 className="text-xl font-semibold mb-2">Why Choose Us?</h2>
          <ul className="list-disc list-inside mb-4 px-12">
            <li>Tailored consulting sessions to meet your unique needs.</li>
            <li>In-depth knowledge of various universities and programs.</li>
            <li>Proven success in securing scholarships and admissions.</li>
            <li>Comprehensive resources and tools for students.</li>
          </ul>

          <div className="max-w-[300px] flex justify-center items-center">
            <Button
              onClick={() => {
                router.push("/ExploreMore");
              }}
              label="Explore More"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
