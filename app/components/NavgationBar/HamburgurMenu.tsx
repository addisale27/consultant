"use client";
import { useState } from "react";
import {
  AiFillCaretDown,
  AiFillCaretRight,
  AiOutlineMenu,
} from "react-icons/ai";
import BackDrop from "./BackDrop";
import MenuItem from "./MenuItem";
import Link from "next/link";

interface HamburgurMenuProps {
  nations: string[];
}

const HamburgurMenu: React.FC<HamburgurMenuProps> = ({ nations }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleDestinationMenu = () => {
    setIsDestinationOpen((prev) => !prev);
  };

  return (
    <>
      <div className="relative z-30" onClick={toggleMenu}>
        <span>
          <AiOutlineMenu size={24} />
        </span>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[200px] right-0 top-12 cursor-pointer flex flex-col bg-white">
            <Link href="/profile">
              <MenuItem onClick={toggleMenu}>Profile</MenuItem>
            </Link>

            <div className="relative z-30">
              <div
                onClick={toggleDestinationMenu}
                className="flex flex-col gap-1 cursor-pointer px-4 py-3 hover:bg-neutral-100 transition text-md font-normal"
              >
                <div className="flex gap-1 items-center">
                  <span>Destinations</span>
                  {isDestinationOpen ? (
                    <AiFillCaretDown />
                  ) : (
                    <AiFillCaretRight />
                  )}
                </div>
                {isDestinationOpen && (
                  <div className="px-4 cursor-pointer flex flex-col">
                    {nations.map((destination) => (
                      <Link key={destination} href={`/${destination}`}>
                        <MenuItem onClick={toggleMenu}>{destination}</MenuItem>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Link href="/profile">
              <MenuItem onClick={toggleMenu}>Apply Now</MenuItem>
            </Link>
            <Link href="/profile">
              <MenuItem onClick={toggleMenu}>About Us</MenuItem>
            </Link>
            <Link href="/profile">
              <MenuItem onClick={toggleMenu}>Contact Us</MenuItem>
            </Link>
          </div>
        )}
      </div>
      {isOpen && <BackDrop onClick={toggleMenu} />}
    </>
  );
};

export default HamburgurMenu;
