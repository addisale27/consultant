"use client";

import Image from "next/image";
import heroimage from "../../assets/herosectionbg.jpg";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { Redressed } from "next/font/google";
const redressed = Redressed({ subsets: ["latin"], weight: "400" });
const HeroSection = () => {
  const router = useRouter();
  return (
    <div className="relative bg-gray-900 overflow-hidden">
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
        <div
          className={` ${redressed.className}flex flex-col flex-1 max-w-[700px]  `}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-slate-300">
            Unlock Your Educational & Job Future With Us!
          </h1>
          <p className="text-lg md:text-xl mb-4 px-12 font-semibold text- ">
            Expert guidance for scholarship applications and job selection.
          </p>

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
