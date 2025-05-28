import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/assets/Logo.png";
import { RiHome9Line } from "react-icons/ri";
import Content from "./Content";

const page = () => {
  return (
    <div className=" bg-[#000000] min-h-screen h-full text-[#fff] ">
      <div className=" max-w-[1400px] mx-auto h-full px-3 ">
        <div className=" h-[5rem] flex items-center justify-between  ">
          <Link href={`/`} className=" text-[2rem] ">
            <Image
              src={Logo}
              alt="Logo"
              className=" w-[10rem] mt-5 object-contain "
            />
          </Link>
          <Link
            href={`/`}
            className="flex items-center gap-2 bg-[#800020] text-[#fff]  transition-colors duration-300 ease-in-out rounded-lg px-8 py-2 text-[1.1rem]  "
          >
            <RiHome9Line className=" text-[1.3rem] " />
            <span>Home</span>
          </Link>
        </div>
      </div>

        <div>
            <Content />
        </div>

    </div>
  );
};

export default page;
