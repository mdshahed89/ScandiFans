"use client";

import { useData } from "@/context/Context";
import { PageLoading } from "@/utils/Loading";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdJoinLeft, MdRoundaboutRight } from "react-icons/md";
import { RiAccountBox2Line } from "react-icons/ri";
import Logo from "@/assets/Logo.png"
import Image from "next/image";

const Header = () => {
  const [isClientReady, setIsClientReady] = useState(false);

  const { userData } = useData();

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  if (!isClientReady) {
    return <PageLoading />;
  }

  return (
    <header className=" bg-[#000000] border-b text-[#F4F1ED] border-[#353535] fixed w-full left-0 top-0  z-50  ">
      <div className=" flex items-center w-full max-w-[1400px] mx-auto   ">
        <div className=" border-r border-[#353535] pr-[2rem] mr-[2rem] h-full py-3 ">
          <Link href={`/`} className=" text-[2rem] flex items-center ">
            <Image src={Logo} alt="Logo" className=" w-[10rem] mt-5 object-contain " />
          </Link>
        </div>
        <div className=" w-full flex items-center justify-between ">
          <div className=" relative ">
            <div className=" absolute h-full flex items-center text-[1.5rem] ">
              <FiSearch className=" text-gray-400 " />
            </div>
            <input
              type="text"
              placeholder="Søk etter profil"
              className=" outline-none bg-transparent text-[1.2rem] pr-3 pl-[2rem] "
            />
          </div>
          <div className=" flex items-center gap-2 ">
            {userData && userData?._id && userData?.email ? (
              <Link
                href={`/profile/${userData?._id}`}
                className="flex items-center gap-2 bg-[#800020] text-[#F4F1ED] border-2 border-[#800020]  transition-colors duration-300 ease-in-out rounded-lg px-8 py-2 text-[1.1rem]  "
              >
                <RiAccountBox2Line className=" text-[1.3rem] " />
                <span>Profile</span>
              </Link>
            ) : (
              <Link
                href={`/loggin`}
                className="flex items-center gap-2 bg-[#800020] text-[#F4F1ED] border-2 border-[#800020]  transition-colors duration-300 ease-in-out rounded-lg px-8 py-2 text-[1.1rem]  "
              >
                <RiAccountBox2Line className=" text-[1.3rem] " />
                <span>Logg Inn</span>
              </Link>
            )}
            
            {
              (!userData || !userData?._id || !userData?.email) && <Link
              href={`/registrering`}
              className="flex items-center gap-2 bg-gradient-to-tr from-[#800020] border-2 border-[#800020] via-black to-[#800020] text-[#F4F1ED]  transition-colors duration-300 ease-in-out rounded-lg px-8 py-2 text-[1.1rem]  "
            >
              <MdJoinLeft className=" text-[1.3rem] " />
              <span>Join</span>
            </Link>
            }
            <Link
              href={`#`}
              className="flex items-center gap-2 bg-[#800020] border-2 border-[#800020] text-[#F4F1ED]  transition-colors duration-300 ease-in-out rounded-lg px-8 py-2 text-[1.1rem]  "
            >
              <MdRoundaboutRight className=" text-[1.3rem] " />
              <span>FAQ</span>
            </Link>
            {/* <div className="p-[2px] rounded-lg bg-gradient-to-r  from-red-600 via-red-600 to-red-400">
              <Link
                href={`/loggin`}
                className="flex items-center gap-2 bg-[#000] text-red-600 hover:bg-[#7B1E3C20] transition-colors duration-300 ease-in-out rounded-lg px-8 py-2 text-[1.1rem]  "
              >
                <RiAccountBox2Line className="mt-1 text-[1.3rem] " />
                <span>Logg inn</span>
              </Link>
            </div> */}
            {/* <div className="p-[2px] rounded-lg bg-gradient-to-r from-red-600 via-red-600 to-red-400">
              <Link
                href="#"
                className="flex items-center gap-2 bg-[#000] text-red-600 hover:bg-[#7B1E3C20] transition-colors duration-300 ease-in-out rounded-lg px-8 py-2 text-[1.1rem] "
              >
                <MdRoundaboutRight className="mt-1 text-[1.3rem] " />
                <span>Om oss</span>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
