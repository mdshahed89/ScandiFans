"use client";

import Header from "@/components/Header";
import HomeSidebar from "@/components/HomeSidebar";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Home() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Sory by");
  const infoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setInfoOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <Header />
    <div className=" bg-[#080413] text-[#fff] min-h-[100vh] pt-[5rem] ">
      <div className=" max-w-[1400px] mx-auto pt-[5rem] flex gap-20 ">
        <HomeSidebar />
        <div className=" w-2/3 relative ">
          <div className=" flex justify-end ">
            <div className="w-[10rem] relative text-center " ref={infoRef}>
              <div
                className="w-full px-4 py-2 border-2 border-gray-700 rounded-md cursor-pointer flex items-center justify-center gap-3 text-[#d1d1d1] "
                onClick={() => setInfoOpen(!infoOpen)}
              >
                <span>{selectedSort}</span>
                <IoIosArrowDown
                  className={` ${
                    infoOpen ? "rotate-180" : ""
                  } transition-all duration-300 ease-in-out text-[1.1rem] `}
                />
              </div>
              {infoOpen && (
                <ul className="absolute w-full border-2 border-gray-700 rounded-lg mt-1 shadow-lg z-10">
                  {["Info", "Warning", "Alert"].map((option) => (
                    <li
                      key={option}
                      className="px-4 py-2 hover:bg-gray-800 cursor-pointer rounded-md "
                      onClick={() => {
                        setSelectedSort(option);
                        setInfoOpen(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className=" mt-[2rem] ">profiles</div>
        </div>
      </div>
    </div>
    </div>
  );
}
