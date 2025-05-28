"use client";

import React, { useEffect, useState } from "react";
import { BiMessageRoundedDots } from "react-icons/bi";
import { BsCalendar3 } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6";
import { RiApps2Line } from "react-icons/ri";
import { Range, getTrackBackground } from "react-range";

type Filters = {
  page: number;
  limit: number;
  nationality?: string;
  identity: string[];
  minAge?: string;
  maxAge?: string;
};

interface HomeSidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
}

const HomeSidebar: React.FC<HomeSidebarProps> = ({
  filters,
  setFilters,
  isOpen,
  setIsOpen,
  toggleSidebar,
}) => {
  const MIN = 18;
  const MAX = 69;

  const options: string[] = [
    "Man",
    "Woman",
    "Non-binary",
    "Transsexual",
    "BDSM",
    "Gay",
    "Lesbian",
    "Fetish",
    "Other",
  ];

  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  const [values, setValues] = useState<number[]>([MIN, MAX]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minAge: String(values[0]),
      maxAge: String(values[1]),
      page: 1,
    }));
  }, [values, setFilters]);

  const handleNationalityClick = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      nationality: value,
      page: 1,
    }));
  };

  const handleIdentityChange = (value: string) => {
    setFilters((prev) => {
      const updated = prev.identity.includes(value)
        ? prev.identity.filter((v) => v !== value)
        : [...prev.identity, value];
      return { ...prev, identity: updated, page: 1 };
    });
  };

  const toggleOption = (label: string) => {
    setToggles((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
    handleIdentityChange(label);
  };

  // const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFilters((prev) => ({
  //     ...prev,
  //     [name]: value,
  //     page: 1,
  //   }));
  // };

  //   const handleAgeChange = (newValues: number[]) => {
  //   setValues(newValues);
  //   setFilters((prev) => ({
  //     ...prev,
  //     minAge: String(newValues[0]),
  //     maxAge: String(newValues[1]),
  //     page: 1,
  //   }));
  // };

  const nationalities = [
    "Norway",
    "Sweden",
    "Denmark",
    "Finland",
    "Iceland",
    "Other",
  ];

  // console.log(values);

  return (
    <div
      className={` md:relative fixed top-0 left-0 z-[60] md:bg-transparent bg-[#000] w-[20rem] md:px-0 px-3 md:h-auto h-[100vh] md:w-1/3 pt-[9rem] md:pt-1 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 `}
    >
      <div className=" flex items-center justify-between ">
        <div className=" flex items-center gap-3 text-[1.2rem] text-[#F4F1ED] ">
          <BiMessageRoundedDots className=" mt-1 text-[1.5rem] " />
          <span>Nasjonalitet</span>
        </div>

        <div
          onClick={toggleSidebar}
          className=" md:hidden flex p-3 rounded-full text-[#F4F1ED] bg-[#800020] shadow-inner text-[1.2rem] "
        >
          <FaXmark />
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-2 mt-[1.5rem] text-[#cac8c6]">
        {nationalities.map((nation) => (
          <div
            key={nation}
            onClick={() => handleNationalityClick(nation)}
            className={` ${
              filters.nationality === nation
                ? "bg-[#800020] border-[#800020]"
                : "bg-transparent border-[#505050]"
            } py-1 border rounded-md text-center px-6 cursor-pointer hover:bg-[#800020] hover:border-[#800020] transition-colors duration-300 ease-in-out  `}
          >
            {nation}
          </div>
        ))}
      </div>

      <div className=" mt-[3rem] ">
        <div className=" flex items-center gap-3 text-[1.2rem] text-[#F4F1ED] ">
          <RiApps2Line className=" mt-1 text-[1.4rem] " />
          <span>Innhold</span>
        </div>

        <div className=" mt-[1rem] space-y-4 text-[#cac8c6] ">
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
                <div className="w-12 h-6 shadow-inner bg-transparent ring-1 ring-[#800020] peer-checked:ring-[#800020] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#800020] rounded-sm peer peer-checked:bg-[#7b1e3bc2] transition-all duration-300"></div>
                <div className="absolute left-[4px] top-1 bg-[#800020] w-4 h-4 rounded-sm transition-transform duration-300 peer-checked:translate-x-[1.6rem] "></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className=" mt-[3rem] ">
        <div className=" flex items-center gap-3 text-[1.2rem] text-[#F4F1ED] ">
          <BsCalendar3 className=" text-[1.2rem] " />
          <span>Alder</span>
        </div>

        <div className=" mt-[.5rem] w-full flex flex-col items-center justify-center px-2 text-[#cac8c6] ">
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
                    colors: ["#ccc", "#800020", "#ccc"],
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
                  className="w-5 h-5 bg-[#800020] rounded flex items-center justify-center shadow-md outline-none "
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
