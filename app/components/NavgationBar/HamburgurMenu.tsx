"use client";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import BackDrop from "./BackDrop";
import MenuItem from "./MenuItem";
import Link from "next/link";
import HamburgurDestination from "./HamburgurDestinationMenu";

interface HamburgurMenuProps {
  nations: string[];
}

const HamburgurMenu: React.FC<HamburgurMenuProps> = ({ nations }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
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

            <HamburgurDestination scholarshipsDestinations={nations} />

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
