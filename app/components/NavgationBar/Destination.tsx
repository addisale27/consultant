"use client";
import Link from "next/link";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
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

const Destination: React.FC<DestinationProps> = ({
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
          className="flex items-center border-[1px] border-slate-400 gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700 p-2"
        >
          <span>Destination</span>
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[200px] bg-white overflow-hidden left-0 top-12 text-sm cursor-pointer flex flex-col">
            {scholarshipsDestinations.map((destination) => (
              <div key={destination} className="flex flex-col justify-center">
                <Link href={`/${destination}`}>
                  <MenuItem onClick={toggleOpen}>{`${destination}`}</MenuItem>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      {isOpen && <BackDrop onClick={toggleOpen} />}
    </>
  );
};

export default Destination;
