"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { GoSignOut } from "react-icons/go";
import PlanIcon from "@/assets/PlanIcon.png";
import Image from "next/image";
import { GiCheckMark } from "react-icons/gi";

const Page = () => {
  const searchParams = useSearchParams();

  const value = searchParams.get("query");

  return (
    <div className=" bg-[#080413] min-h-screen h-full text-[#fff] ">
      <div className=" max-w-[1400px] mx-auto h-full ">
        <div className=" h-[5rem] flex items-center justify-between  ">
          <div className=" text-[2rem] ">ScandiFans</div>
          <div className="p-[2px] rounded-lg bg-gradient-to-r from-[#4ED7F1] to-gray-600">
            <Link
              href={`/loggin`}
              className="flex items-center gap-2 bg-white dark:bg-black rounded-lg px-8 py-2 text-[1.1rem] text-[#bebebe] "
            >
              <GoSignOut className=" text-[1.3rem] " />
              <span>Sign Out</span>
            </Link>
          </div>
        </div>

        <div className=" min-h-[calc(100vh-5rem)] pt-[7rem] pb-[5rem] flex items-center justify-center ">
          {value === "overview" ? <Overview /> : <Plans />}
        </div>
      </div>
    </div>
  );
};

export default Page;

const Overview = () => {
  return (
    <div>
      <div>
        <Image
          src={PlanIcon}
          alt="Plan icon"
          className=" w-[10rem] mx-auto object-contain "
        />
      </div>
      <div className=" max-w-[30rem] text-center mx-auto mt-[2rem] ">
        <div className=" text-[1.2rem] text-[#d1d1d1] font-semibold ">
          Step 2 of 3
        </div>
        <h3 className=" text-[2.5rem] font-bold leading-tight ">
          Choose your plan
        </h3>
      </div>

      <div className=" mt-[2rem] space-y-3 ">
        <div className=" flex items-center gap-3 ">
          <div className=" text-[1.3rem] text-[#4ED7F1] ">
            <GiCheckMark />
          </div>
          <p className=" text-[1.1rem] text-[#e4e4e4] ">
            No commitments, cancel anytime.
          </p>
        </div>
        <div className=" flex items-center gap-3 ">
          <div className=" text-[1.3rem] text-[#4ED7F1] ">
            <GiCheckMark />
          </div>
          <p className=" text-[1.1rem] text-[#e4e4e4] ">
            No commitments, cancel anytime.
          </p>
        </div>
        <div className=" flex items-center gap-3 ">
          <div className=" text-[1.3rem] text-[#4ED7F1] ">
            <GiCheckMark />
          </div>
          <p className=" text-[1.1rem] text-[#e4e4e4] ">
            No commitments, cancel anytime.
          </p>
        </div>
        <div className=" flex items-center gap-3 ">
          <div className=" text-[1.3rem] text-[#4ED7F1] ">
            <GiCheckMark />
          </div>
          <p className=" text-[1.1rem] text-[#e4e4e4] ">
            No commitments, cancel anytime.
          </p>
        </div>
      </div>
      <div className=" mt-[2rem] ">
        <Link
          href={`/planer`}
          className=" bg-[#4ED7F1] text-[#000] w-full py-2 rounded-md block text-center font-medium text-[1.1rem] mx-auto cursor-pointer "
        >
          Next
        </Link>
      </div>
    </div>
  );
};

const Plans = () => {
  const points = [
    "Featured placement on homepage & discovery sections",
    "Highlighted in the ScandiFans newsletter",
    "Boosted visibility in search results",
    "Priority support",
    "Increased profile reach across partner platforms",
  ];

  return (
    <div>
      <div className=" text-center ">
        <div className=" text-[1.2rem] text-[#d1d1d1] font-semibold ">
          Step 3 of 3
        </div>
        <div className=" max-w-[45rem] ">
          <h2 className=" text-[2.5rem] font-bold  leading-tight mt-[.5rem] mb-[1.5rem] ">
            Boost your profile with ScandiFans Promotion Packages
          </h2>
          <p>
            Want more traffic, visibility, and subscribers? Our promotion
            packages are designed to push your profile to the top of ScandiFans
            — making you more discoverable and increasing your chances of
            success.
          </p>
        </div>
      </div>

      <div className=" bg-white text-[#000] w-[28rem] mx-auto px-[2rem] pb-[2rem] mt-[2rem] rounded-xl relative overflow-hidden ">
        <div className=" absolute w-2 h-2 rounded-full bg-[#4ED7F1] top-5 left-5 "></div>
        <div className=" absolute w-6 h-6 rounded-full bg-[#4ED7F1] top-16 -left-3 "></div>
        <div className=" absolute w-6 h-6 rounded-full bg-[#d3d4d4] top-16 -right-3 "></div>
        <div className=" absolute w-4 h-4 rounded-full bg-[#4ED7F1] top-[10rem] left-[3rem] "></div>
        <div className=" absolute w-4 h-4 rounded-full bg-[#4ED7F1] top-[10rem] right-[3rem] "></div>
        <div className=" absolute w-3 h-3 rounded-full bg-[#4ED7F1] top-[3rem] right-[2rem] "></div>
        <div className=" px-[10%]  ">
            <div className=" bg-[#4ED7F1] text-[1.7rem] font-bold flex items-center justify-center h-[8rem] rounded-b-xl  ">7 Days</div>
        </div>
        <div className=" text-[2rem] font-semibold text-center mt-[1rem] ">499 Nok</div>

        <div className=" mt-[3rem] space-y-3 ">
          {points.map((point, idx) => (
            <div key={idx} className=" flex items-center gap-3 ">
              <div className=" text-[1.3rem] text-[#4ED7F1] ">
                <GiCheckMark />
              </div>
              <p className=" text-[1.1rem] text-[#2e2e2e] ">{point}</p>
            </div>
          ))}
        </div>

        <div className=" pt-[5rem] w-full ">
          <button className=" w-full py-2 rounded-md px-10 bg-[#4ED7F1] text-[#000] font-medium text-[1.1rem] ">
            Next
          </button>
          </div>

      </div>
    </div>
  );
};
