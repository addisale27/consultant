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
import { CurrentUser } from "./UserMenu";
import Avatar from "../Avatar";
import { useRouter } from "next/navigation";

interface HamburgurMenuProps {
  nations: string[];
  currentUser: CurrentUser | null;
}

const HamburgurMenu: React.FC<HamburgurMenuProps> = ({
  nations,
  currentUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleDestinationMenu = () => {
    setIsDestinationOpen((prev) => !prev);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    event.stopPropagation(); // Prevent event bubbling
    toggleDestinationMenu(); // Toggle destination menu on touch start
  };

  const router = useRouter();

  return (
    <>
      <div className="relative z-30" onClick={toggleMenu}>
        <span>
          <AiOutlineMenu size={24} />
        </span>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[200px] right-0 top-12 cursor-pointer flex flex-col bg-white">
            <MenuItem
              onClick={() => {
                router.push("/register");
              }}
            >
              {currentUser ? (
                <span className="flex gap-2 items-center">
                  <Avatar src={currentUser?.image} />
                  <span className="text-sm">{currentUser.name}</span>
                </span>
              ) : (
                `Join Us`
              )}
            </MenuItem>

            <div className="relative z-40">
              <div className="flex flex-col gap-1 cursor-pointer px-4 py-3 hover:bg-neutral-100 transition text-md font-normal">
                <div
                  className="flex gap-1 items-center"
                  onTouchStart={handleTouchStart} // Use touch start
                  onTouchEnd={(e) => e.stopPropagation()} // Stop propagation on touch end
                >
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
                      <Link
                        key={destination}
                        href={`/${destination}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <MenuItem onClick={() => {}}>{destination}</MenuItem>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Link href="/profile">
              <MenuItem onClick={() => setIsOpen(false)}>Apply Now</MenuItem>
            </Link>
            <Link href="/profile">
              <MenuItem onClick={() => {}}>About Us</MenuItem>
            </Link>
            <Link href="/contactUs">
              <MenuItem onClick={() => {}}>Contact Us</MenuItem>
            </Link>
          </div>
        )}
      </div>
      {isOpen && <BackDrop onClick={toggleMenu} />}
    </>
  );
};

export default HamburgurMenu;
