"use client";

import { useData } from "@/context/Context";
import { PageLoading } from "@/utils/Loading";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdJoinLeft, MdRoundaboutRight } from "react-icons/md";
import { RiAccountBox2Line } from "react-icons/ri";
import Logo from "@/assets/Logo.png";
import Image from "next/image";
import { LuUserRound } from "react-icons/lu";

interface Filters {
  page: number;
  limit: number;
  nationality: string;
  identity: string[];
  minAge?: string;
  maxAge?: string;
  search: string;
}

interface HeaderProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const Header: React.FC<HeaderProps> = ({ filters, setFilters }) => {
  const [isClientReady, setIsClientReady] = useState(false);

  const { userData } = useData();

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  const [searchTerm, setSearchTerm] = useState(filters.search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: searchTerm,
        page: 1, // reset page when searching
      }));
    }, 500); // debounce delay 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, setFilters]);

  if (!isClientReady) {
    return <PageLoading />;
  }

  console.log(filters);
  

  return (
    <header className=" bg-gradient-to-r from-[#000] to-[#470012] border-b text-[#F4F1ED] border-[#353535] fixed w-full left-0 top-0  z-50  ">
      <div className=" flex items-center w-full max-w-[1400px] mx-auto px-3 ">
        <div className=" border-r border-[#353535] pr-[1rem] md:pr-[2rem] mr-[1rem] md:mr-[2rem] h-full py-3 ">
          <Link href={`/`} className=" text-[2rem] flex items-center ">
            <Image
              src={Logo}
              alt="Logo"
              className=" w-[13rem] md:w-[10rem] mt-5 object-contain "
            />
          </Link>
        </div>
        <div className=" w-full flex items-center justify-end lg:justify-between ">
          <div className=" lg:flex hidden relative ">
            <div className=" absolute h-full flex items-center text-[1.5rem] ">
              <FiSearch className=" text-gray-400 " />
            </div>
            <input
              type="text"
              placeholder="Search by username or name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=" outline-none bg-transparent text-[1.2rem] pr-3 pl-[2rem] "
            />
          </div>
          <div className=" flex items-center gap-2 ">
            <Link
              href={`#`}
              className=" flex lg:hidden items-center gap-2 bg-[#800020] border-2 border-[#800020] text-[#F4F1ED]  transition-colors duration-300 ease-in-out rounded-full px-2 py-2 text-[1.1rem]  "
            >
              <FiSearch className=" text-[1.3rem] " />
            </Link>
            <Link
              href={`/faq`}
              className=" flex lg:hidden items-center gap-2 bg-[#800020] border-2 border-[#800020] text-[#F4F1ED]  transition-colors duration-300 ease-in-out rounded-full px-2 py-2 text-[1.1rem]  "
            >
              <MdRoundaboutRight className=" text-[1.3rem] " />
            </Link>
            {userData && userData?._id && userData?.email ? (
              <Link
                href={`/profile/${userData?._id}`}
                className="flex items-center gap-2 bg-[#800020] text-[#F4F1ED] md:border-2 border-[#800020]  transition-colors duration-300 ease-in-out rounded-lg px-3 md:px-8 py-2 text-[1.1rem]  "
              >
                <LuUserRound className=" text-[1.2rem] " />
                <span>Profile</span>
              </Link>
            ) : (
              <>
                <Link
                  href={`/loggin`}
                  className=" hidden lg:flex items-center gap-2 bg-[#800020] text-[#F4F1ED] md:border-2 border-[#800020]  transition-colors duration-300 ease-in-out rounded-lg px-3 md:px-8 py-2 text-[1.1rem]  "
                >
                  <RiAccountBox2Line className=" text-[1.3rem] " />
                  <span>Logg Inn</span>
                </Link>
                <Link
                  href={`/registrering`}
                  className=" flex lg:hidden items-center gap-2 bg-gradient-to-tr from-[#800020] border-2 border-[#800020] via-black to-[#800020] text-[#F4F1ED]  transition-colors duration-300 ease-in-out rounded-lg px-5 md:px-8 py-2 text-[1.1rem]  "
                >
                  <MdJoinLeft className=" text-[1.3rem] " />
                  <span>Join</span>
                </Link>
              </>
            )}

            {(!userData || !userData?._id || !userData?.email) && (
              <Link
                href={`/registrering`}
                className=" hidden lg:flex items-center gap-2 bg-gradient-to-tr from-[#800020] border-2 border-[#800020] via-black to-[#800020] text-[#F4F1ED]  transition-colors duration-300 ease-in-out rounded-lg px-8 py-2 text-[1.1rem]  "
              >
                <MdJoinLeft className=" text-[1.3rem] " />
                <span>Join</span>
              </Link>
            )}
            <Link
              href={`/faq`}
              className=" hidden lg:flex items-center gap-2 bg-[#800020] border-2 border-[#800020] text-[#F4F1ED]  transition-colors duration-300 ease-in-out rounded-lg px-8 py-2 text-[1.1rem]  "
            >
              <MdRoundaboutRight className=" text-[1.3rem] " />
              <span className=" lg:block hidden ">FAQ</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
