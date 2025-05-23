import Link from "next/link";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { MdRoundaboutRight } from "react-icons/md";
import { RiAccountBox2Line } from "react-icons/ri";

const Header = () => {
  return (
    <header className=" bg-[#080413] border-b text-[#fff] border-[#353535] fixed w-full left-0 top-0  ">
      <div className=" flex items-center w-full max-w-[1400px] mx-auto   ">
        <div className=" border-r border-[#353535] pr-[2rem] mr-[2rem] h-full py-4 ">
          <h3 className=" text-[2rem] ">ScandiFans</h3>
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
          <div className=" flex items-center gap-3 ">
            <div className="p-[2px] rounded-lg bg-gradient-to-r from-[#4ED7F1] to-gray-600">
              <Link
                href={`/loggin`}
                className="flex items-center gap-2 bg-white dark:bg-black rounded-lg px-8 py-2 text-[1.1rem] text-[#bebebe] "
              >
                <RiAccountBox2Line className="mt-1 text-[1.3rem] " />
                <span>Logg inn</span>
              </Link>
            </div>
            <div className="p-[2px] rounded-lg bg-gradient-to-r from-[#4ED7F1] to-gray-600">
              <Link
                href="#"
                className="flex items-center gap-2 bg-white dark:bg-black rounded-lg px-8 py-2 text-[1.1rem] text-[#bebebe] "
              >
                <MdRoundaboutRight className="mt-1 text-[1.3rem] " />
                <span>Om oss</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
