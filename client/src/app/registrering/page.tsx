"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { BsFillSignIntersectionSideFill } from "react-icons/bs";
import { MdArrowForwardIos } from "react-icons/md";
import StepsIcon from "@/assets/StepsIcon.png";
import Image from "next/image";
import { RiArrowGoBackFill } from "react-icons/ri";

const Page = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  const value = searchParams.get("query");
  const valueOfEmail = searchParams.get("email");
  const router = useRouter();

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isValidEmail(email)) {
      e.preventDefault();
      setError("Please enter a valid email address");
    } else {
      setError("");
      router.push(`/registrering?query=steps`);
    }
  };

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
              <BsFillSignIntersectionSideFill className=" text-[1.3rem] " />
              <span>Sign In</span>
            </Link>
          </div>
        </div>

        <div className=" h-[calc(100vh-5rem)] flex items-center justify-center ">
          {value === "steps" ? (
            <Steps email={email} />
          ) : value === "password" && valueOfEmail ? (
            <Step1 email={valueOfEmail} />
          ) : (
            <div className=" text-center max-w-[55rem] space-y-2 ">
              <h2 className=" text-[3.5rem] font-semibold leading-tight ">
                Boost your profile with ScandiFans Promotion Packages
              </h2>
              <h4 className=" text-[1.7rem] ">Start from 499 Nok</h4>
              <div className=" pt-[3rem] space-y-3 ">
                <h4 className=" text-[1.3rem] ">
                  Ready to Promote your profile? Enter your email to create your
                  membership.
                </h4>
                <div className=" text-[1.5rem] flex items-center gap-2 mx-auto h-[3.5rem] ">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className=" py-2 px-4 bg-transparent border border-[#fff] rounded-md outline-none w-full "
                    name=""
                    id=""
                  />
                  <div
                    onClick={handleClick}
                    className=" flex items-center gap-2 bg-[#4ED7F1] text-[#000] px-6 py-2 rounded-md cursor-pointer "
                  >
                    <span className=" text-nowrap ">Get Started</span>
                    <MdArrowForwardIos className=" mt-1 " />
                  </div>
                </div>
                {error && (
                  <p className="text-red-500 text-left text-sm">{error}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;

const Steps = ({ email }: { email: string }) => {
  return (
    <div>
      <div>
        <Image
          src={StepsIcon}
          alt="Steps icon"
          className=" w-[10rem] mx-auto object-contain "
        />
      </div>
      <div className=" max-w-[30rem] text-center mx-auto mt-[2rem] ">
        <h3 className=" text-[2.5rem] font-bold leading-tight ">
          Finish setting up your account with 3 steps
        </h3>
        <div className=" text-[1.2rem] text-[#cccccc] mt-[1rem] ">
          <p>Scandify is personalized for you.</p>
          <p>Complete all the steps to promote your profile</p>
        </div>
        <div className=" mt-[2rem] ">
          <Link
            href={`/registrering?query=password&email=${encodeURIComponent(
              email
            )}`}
            className=" bg-[#4ED7F1] text-[#000] px-16 py-2 rounded-md w-fit font-medium text-[1.1rem] mx-auto cursor-pointer "
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
};

const Step1 = ({ email }: { email: string }) => {
  const [password, setPassword] = useState("");
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push("/planer?query=overview")
  }

  return (
    <div>
      <div className=" text-[1.2rem] text-[#d1d1d1] font-semibold ">
        Step 1 of 3
      </div>
      <h2 className=" text-[2.5rem] font-bold max-w-[35rem] leading-tight mt-[.5rem] mb-[1.5rem] ">
        Create a password to start your membership
      </h2>
      <div className=" text-[1.3rem] ">
        <p>You&apos;re almost there! Just a couple more steps to go.</p>
        <p>Don&apos;t worry — we&apos;ll keep it quick!</p>
      </div>

      <form onSubmit={handleSubmit} className=" mt-[2rem] max-w-[25rem] space-y-4 ">
        <input
          type="text"
          placeholder="Enter email"
          name=""
          className=" border border-[#585858] rounded-md outline-none bg-transparent py-2 px-3 w-full text-[1.1rem] "
          value={email}
          disabled
        />
        <input
          type="password"
          placeholder="Enter Password"
          name=""
          className=" border border-[#585858] rounded-md outline-none bg-transparent py-2 px-3 w-full text-[1.1rem] "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className=" pt-[1rem] w-full ">
          <button className=" w-full py-2 rounded-md px-10 bg-[#4ED7F1] text-[#000] font-medium text-[1.1rem] ">
            Next
          </button>
          <div className=" mt-[1rem] ">
            <Link
              href={`/registrering?query=steps`}
              className=" text-[1.2rem] border-b pr-2 text-[#b8b8b8] font-medium flex items-center gap-2 w-fit "
            >
              <span>Back</span>
              <RiArrowGoBackFill className=" mt-1 " />
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
