"use client";

import React, { useState } from "react";
import { BiMessageRoundedDots } from "react-icons/bi";
import { BsCalendar3 } from "react-icons/bs";
import { RiApps2Line } from "react-icons/ri";
import { Range, getTrackBackground } from "react-range";

const HomeSidebar = () => {
  const MIN = 18;
  const MAX = 69;

  const options: string[] = [
    "Mann",
    "Kvinne",
    "Ikke-binær",
    "Transseksuell",
    "BDSM",
    "Homo",
    "Lesbisk",
    "Fetish",
    "Annet",
  ];

  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  const [values, setValues] = useState<number[]>([18, 69]);

  const toggleOption = (label: string) => {
    setToggles((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div className=" w-1/3 ">
      <div className=" flex items-center gap-3 text-[1.2rem] ">
        <BiMessageRoundedDots className=" mt-2 text-[1.4rem] " />
        <span>Nasjonalitet</span>
      </div>
      <div className=" grid grid-cols-3 gap-3 mt-[1.5rem] ">
        <div className=" py-1 border rounded-md text-center border-[#8d8d8d] ">
          Norge
        </div>
        <div className=" py-1 border rounded-md text-center border-[#8d8d8d] ">
          Sverige
        </div>
        <div className=" py-1 border rounded-md text-center border-[#8d8d8d] ">
          Danmark
        </div>
        <div className=" py-1 border rounded-md text-center border-[#8d8d8d] ">
          Finland
        </div>
        <div className=" py-1 border rounded-md text-center border-[#8d8d8d] ">
          Island
        </div>
        <div className=" py-1 border rounded-md text-center border-[#8d8d8d] ">
          Annet
        </div>
      </div>

      <div className=" mt-[3rem] ">
        <div className=" flex items-center gap-3 text-[1.2rem] ">
          <RiApps2Line className=" mt-1 text-[1.4rem] " />
          <span>Innhold</span>
        </div>

        <div className=" mt-[1rem] space-y-4">
          {options.map((label) => (
            <div
              key={label}
              className="flex justify-between items-center w-full"
            >
              <span>{label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={toggles[label] || false}
                  onChange={() => toggleOption(label)}
                />
                <div className="w-12 h-6 shadow-inner bg-transparent ring-1 ring-gray-600 peer-checked:ring-sky-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sky-500 rounded-md peer peer-checked:bg-sky-600 transition-all duration-300"></div>
                <div className="absolute left-[4px] top-1 bg-gray-300 w-4 h-4 rounded-md transition-transform duration-300 peer-checked:translate-x-[1.6rem] "></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className=" mt-[3rem] ">
        <div className=" flex items-center gap-3 text-[1.2rem] ">
          <BsCalendar3 className=" text-[1.2rem] " />
          <span>Alder</span>
        </div>

        <div className=" mt-[.5rem] w-full flex flex-col items-center justify-center px-2 bg-black text-white">
          <Range
            values={values}
            step={1}
            min={MIN}
            max={MAX}
            onChange={(vals) => setValues(vals)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="w-full h-1 my-6 rounded"
                style={{
                  background: getTrackBackground({
                    values,
                    colors: ["#ccc", "#0ea5e9", "#ccc"],
                    min: MIN,
                    max: MAX,
                  }),
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => {
              const { key, ...rest } = props;
              return (
                <div
                  key={key}
                  {...rest}
                  className="w-5 h-5 bg-sky-500 rounded flex items-center justify-center shadow-md outline-none "
                >
                  <div className="w-2 h-2 bg-white rounded-sm" />
                </div>
              );
            }}
          />

          <div className="flex justify-between w-full text-sm">
            <span>{values[0]}</span>
            <span>{values[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSidebar;
