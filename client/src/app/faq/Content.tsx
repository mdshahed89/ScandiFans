"use client"

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Content: React.FC = () => {
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const dataArr = [
    {
    title: "How do I find a profile?",
    description:
      "You can search by username using the search bar. You can also browse through all available profiles.",
  },
  {
    title: "I can't find a profile when I search for it — how do I add it?",
    description:
      "You can send us the profile via email at support@scandifans.com, and we'll add it for you.",
  },
  {
    title: "I want to promote a profile so more people see it — how does it work?",
    description:
      "You can promote a profile by searching for the username and clicking the “Promote Profile” button. When you buy promotion, your profile is added to the bottom of the promoted list — and the longer you stay, the higher you move. You can also extend or “top up” your promotion to keep your spot. Most profiles at the top have either been there the longest or have purchased longer promotion durations.",
  },
  {
    title: "How can I contact you?",
    description:
      "You can always reach us at support@scandifans.com - we're happy to help.",
  },
  ];

  const toggle = (idx: number): void => {
    setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
  };

  return (
    <div className="  pt-[8rem] text-[#fff] pb-[2rem] ">
      <div className=" max-w-[1400px] mx-auto px-3 ">
        <div className="  ">
          <div className=" w-full  text-[1.3rem] md:text-[1.5rem] lg:text-[1.6rem] xl:text-[1.8rem] text-[#800020] uppercase font-semibold mt-2 ">
            FAQ
          </div>
          <div className=" w-full ">
            <h2 className=" text-[2rem] md:text-[3rem] lg:text-[3.3rem] xl:text-[3.5rem] font-medium text-[#fff] leading-tight ">
              Frequently Asked{" "}
              <span className=" text-[#800020] ">Questions</span>
            </h2>
            <h3 className=" max-w-[50rem] text-[1.2rem] lg:text-[1.4rem] xl:text-[1.5rem] mt-[1rem] text-[#c2c1c7] ">
              Find answers to the most common questions people ask when getting started, exploring options, or needing quick support.
            </h3>
          </div>
        </div>
        <div className=" mt-[3rem] md:mt-[8rem] mx-auto w-full rounded-lg">
          {dataArr.map((PerAccordion, idx) => (
            <div
              key={idx}
              className=" mb-3 md:mb-8 border-b px-1 md:px-3 py-3  text-[#fff] "
            >
              <button
                onClick={() => toggle(idx)}
                className="flex h-full w-full items-center justify-between font-medium  outline-none"
              >
                <div className=" flex gap-2 md:gap-5 text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] ">
                  <span className=" text-[#800020] ">
                    {idx === 9 ? "" : "0"}
                    {idx + 1}.
                  </span>
                  <span className=" text-left ">{PerAccordion.title}</span>
                </div>
                <span className="transition-all duration-300 ease-in-out text-[#fff] text-[1.3rem] md:text-[1.6rem] lg:text-[2rem] ">
                  <IoIosArrowDown
                    className={` ${
                      isOpen === idx ? "rotate-180" : ""
                    } transition-all duration-300 ease-in-out `}
                  />
                </span>
              </button>
              <div
                className={`grid overflow-hidden text-[#c9cacf] transition-all duration-300 ease-in-out ${
                  isOpen === idx
                    ? "grid-rows-[1fr] pb-1 pt-3 opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden pr-4 text-[1rem] md:text-[1.2rem] lg:text-[1.6rem] ">
                  {PerAccordion.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content