"use client";
import Link from "next/link";
import { useState } from "react";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import MenuItem from "./MenuItem";
import BackDrop from "./BackDrop";

export type Scholarship = {
  id: number;
  nation: string;
  school: string;
  type: string;
  amount: string;
  description: string;
  eligibility: string[];
  applicationDeadline: string; // Consider using Date type if needed
  website: string;
};

interface DestinationProps {
  scholarshipsDestinations: string[];
}

const HamburgurDestination: React.FC<DestinationProps> = ({
  scholarshipsDestinations,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  console.log(scholarshipsDestinations);
  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="flex flex-col   gap-1  cursor-pointer px-4 py-3 hover:bg-neutral-100 transition text-md font-normal"
        >
          <div className="flex gap-1 items-center">
            <span>Destination</span>
            {isOpen ? <AiFillCaretRight /> : <AiFillCaretDown />}
          </div>
          {isOpen && (
            <div className="px-4 cursor-pointer flex flex-col">
              {scholarshipsDestinations.map((destination) => (
                <div
                  key={destination}
                  className="flex flex-col justify-center "
                >
                  <Link href={`/${destination}`}>
                    <MenuItem onClick={toggleOpen}>{`${destination}`}</MenuItem>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* {isOpen && (
          <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden left-12 top-12 text-sm cursor-pointer flex flex-col">
            {scholarshipsDestinations.map((destination) => (
              <div key={destination} className="flex flex-col justify-center">
                <Link href={`/${destination}`}>
                  <MenuItem onClick={toggleOpen}>{`${destination}`}</MenuItem>
                </Link>
              </div>
            ))}
          </div>
        )} */}
      </div>
      {isOpen && <BackDrop onClick={toggleOpen} />}
    </>
  );
};

export default HamburgurDestination;
