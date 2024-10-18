"use client";

import { useState } from "react";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminNavItem from "../components/AdminNavItem";

const AdminNavIcon = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const navToggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex ">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? " w-64 bg-cyan-400" : "w-20 bg-white"
        } transition-all duration-300 ease-in-out 
        text-white flex flex-col  relative`}
      >
        <div className="flex-grow"></div>

        {/* Navigation Items */}
        {isOpen && (
          <div className={`flex flex-col gap-4 p-4 items-start`}>
            <Link href="/admin">
              <AdminNavItem
                label="Summary"
                icon={MdDashboard}
                selected={pathName === "/admin"}
                // Added margin to create space
              />
            </Link>

            <Link href="/admin/add-scholarship">
              <AdminNavItem
                label="Add Scholarship"
                icon={MdLibraryAdd}
                selected={pathName === "/admin/add-scholarship"}
                // Added margin to create space
              />
            </Link>

            <Link href="/admin/manage-scholarship">
              <AdminNavItem
                label="Manage Scholarship"
                icon={MdDns}
                selected={pathName === "/admin/manage-scholarship"}
                // Added margin to create space
              />
            </Link>
            <div className="mb-8">
              <Link href="/admin/manage-applications">
                <AdminNavItem
                  label="Manage Applications"
                  icon={MdFormatListBulleted}
                  selected={pathName === "/admin/manage-applications"}
                  // Added margin to create space
                />
              </Link>
            </div>
          </div>
        )}
        {/* Toggle Icon */}
        <div
          className="mt-8 absolute bottom-4 right-4 cursor-pointer"
          onClick={navToggle}
        >
          {isOpen ? (
            <BiChevronLeft size={24} />
          ) : (
            <BiChevronRight size={24} className="text-black" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNavIcon;
