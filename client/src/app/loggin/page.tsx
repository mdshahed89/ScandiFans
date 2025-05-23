import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiHome9Line } from "react-icons/ri";

const page = () => {
  return (
    <div className=" bg-[#080413] min-h-screen h-full text-[#fff] ">
      <div className=" max-w-[1400px] mx-auto h-full ">
        <div className=" h-[5rem] flex items-center justify-between  ">
          <div className=" text-[2rem] ">ScandiFans</div>
          <div className="p-[2px] rounded-lg bg-gradient-to-r from-[#4ED7F1] to-gray-600">
            <Link
              href={`/`}
              className="flex items-center gap-2 bg-white dark:bg-black rounded-lg px-8 py-2 text-[1.1rem] text-[#bebebe] "
            >
              <RiHome9Line className=" text-[1.3rem] " />
              <span>Home</span>
            </Link>
          </div>
        </div>

        <div className=" h-[calc(100vh-5rem)] flex items-center ">
          <div className=" max-w-[40rem]  border border-[#5a5a5a] mx-auto p-[2rem] rounded-lg ">
            <div className=" text-center space-y-2 ">
              <h3 className=" text-[2rem] ">Login</h3>
              <p className=" text-[#cfcfcf] max-w-[22rem] ">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Inventore, rem.
              </p>
            </div>

            <div className=" mt-[3rem] space-y-4 ">
              <div className=" text-[1.1rem] space-y-2 ">
                <label htmlFor="">Email*</label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  className=" w-full py-2 px-3 border rounded-md outline-none border-[#535353] bg-transparent  "
                />
              </div>
              <div className=" text-[1.1rem] space-y-2 ">
                <label htmlFor="">Password*</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="email"
                  className=" w-full py-2 px-3 border rounded-md outline-none border-[#535353] bg-transparent  "
                />
              </div>

              <div className=" flex justify-end ">
                <div className=" border-b text-[#c9c9c9] border-[#42b9d1] cursor-pointer ">
                  Forgot Password?
                </div>
              </div>

              <div className=" pt-[1rem] text-[1.1rem] ">
                <button className=" w-full bg-[#4ED7F1] rounded-md py-2 text-[#000] font-medium ">
                  Logg In
                </button>
              </div>

              <div className=" pt-[1rem] ">
                New to Scandify?{" "}
                <Link
                  href={`/registrering`}
                  className=" text-[#4ED7F1] font-medium "
                >
                  Sign Up Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
