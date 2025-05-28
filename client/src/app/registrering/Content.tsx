"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsFillSignIntersectionSideFill } from "react-icons/bs";
import { MdArrowForwardIos } from "react-icons/md";
import StepsIcon from "@/assets/StepsIcon.png";
import Image from "next/image";
import { RiArrowGoBackFill } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";
import { useData } from "@/context/Context";
import { IoRocketOutline } from "react-icons/io5";
import Logo from "@/assets/Logo.png"


const Page = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(true);
  const { userData } = useData();

  const value = searchParams.get("query");
  const valueOfEmail = searchParams.get("email");
  const router = useRouter();

  useEffect(() => {
    setIsMounted(false);
  });

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

  if (isMounted) {
    return null;
  }

  return (
    <div className=" bg-gradient-to-tr from-[#000] via-[#000] to-[#470012] min-h-screen h-full text-[#fff] ">
      <div className=" max-w-[1400px] mx-auto h-full ">
        <div className=" h-[5rem] flex items-center justify-between  ">
          <Link href={`/`} className=" text-[2rem] ">
            <Image src={Logo} alt="Logo" className=" w-[10rem] mt-5 object-contain " />
          </Link>
          {/* <div className="p-[2px] rounded-lg bg-gradient-to-r from-[#4ED7F1] to-gray-600">
            <Link
              href={`/loggin`}
              className="flex items-center gap-2 bg-white dark:bg-black rounded-lg px-8 py-2 text-[1.1rem] text-[#bebebe] "
            >
              <BsFillSignIntersectionSideFill className=" text-[1.3rem] " />
              <span>Sign In</span>
            </Link>
          </div> */}
          <Link
            href={`/loggin`}
            className="flex items-center gap-2 bg-[#800020] text-[#fff]  transition-colors duration-300 ease-in-out rounded-lg px-8 py-2 text-[1.1rem]  "
          >
            <BsFillSignIntersectionSideFill className=" text-[1.3rem] " />
            <span>Logg Inn</span>
          </Link>
        </div>

        <div className=" h-[calc(100vh-5rem)] flex items-center justify-center ">
          {userData && userData?.email ? (
            <AccountCreated userData={userData} />
          ) : value === "steps" ? (
            <Steps email={email} />
          ) : value === "password" && valueOfEmail ? (
            <Step1 email={valueOfEmail} />
          ) : (
            <div className=" text-center max-w-[55rem] space-y-2 ">
              <div>
                <h2 className=" text-[3.5rem] font-semibold leading-tight ">
                Boost your profile with ScandiFans Promotion Packages
              </h2>
              <h4 className=" text-[1.7rem] ">Start from 499 Nok</h4>
              </div>

              <div className=" py-[2rem] flex justify-center ">
                <IoRocketOutline className=" text-[4rem] animate-rocket text-[#800020] " />
              </div>

              <div className=" space-y-3 ">
                <h4 className=" text-[1.3rem] ">
                  Ready to Promote your profile? Enter your email to create your
                  membership.
                </h4>
                <div className=" text-[1.4rem] flex items-center gap-2 mx-auto h-[3.5rem] ">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className=" py-2 px-4 bg-transparent border-2 border-[#bdbdbd] rounded-md outline-none w-full "
                    name=""
                    id=""
                  />
                  <div
                    onClick={handleClick}
                    className=" group flex items-center justify-center gap-2 bg-[#800020] border-2 border-[#800020] text-[#fff] w-[18rem] py-2 rounded-md cursor-pointer "
                  >
                    <span className=" text-nowrap ">Get Started</span>
                    <MdArrowForwardIos className=" mt-[2px] group-hover:translate-x-2 transition-all duration-300 ease-in-out " />
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

// interface UserData {
//   id?: string;
//   [key: string]: any;
// }

interface UserData {
  id?: string;
  email?: string;
  isPlanActive?: boolean;
  [key: string]: unknown;
}

interface AccountCreatedProps {
  userData: UserData;
}

const AccountCreated = ({ userData }: AccountCreatedProps ) => {
  return (
    <div>
      <div className=" text-[1.2rem] text-[#d1d1d1] font-semibold ">
        Step 1 of 3
      </div>
      <h2 className=" text-[2.5rem] font-bold max-w-[35rem] leading-tight mt-[.5rem] mb-[1.5rem] ">
        Account Created
      </h2>
      <div className=" text-[1.3rem] ">
        <p>Use this email to access your account:</p>
        <p>{userData?.email}</p>
      </div>
      <div className=" mt-[2rem] ">
        {userData?.isPlanActive ? (
          <Link
            href={`/`}
            className=" bg-[#800020] text-[#F4F1ED] px-16 py-2 rounded-md w-fit font-medium text-[1.1rem] mx-auto cursor-pointer "
          >
            Home
          </Link>
        ) : (
          <Link
            href={`/planer?query=overview`}
            className=" bg-[#800020] text-[#F4F1ED] px-16 py-2 rounded-md w-fit font-medium text-[1.1rem] mx-auto cursor-pointer "
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
};

const Steps = ({ email }: { email: string }) => {
  return (
    <div>
      <div>
        <Image
          src={StepsIcon}
          alt="Steps icon"
          className=" w-[13rem] mx-auto object-contain "
        />
      </div>
      <div className=" max-w-[35rem] text-center mx-auto mt-[2rem] ">
        <h3 className=" text-[3rem] font-bold leading-tight ">
          Finish setting up your account with 3 steps
        </h3>
        <div className=" text-[1.5rem] text-[#cccccc] mt-[1rem] ">
          <p>Scandify is personalized for you.</p>
          <p>Complete all the steps to promote your profile</p>
        </div>
        <div className=" mt-[2rem] ">
          <Link
            href={`/registrering?query=password&email=${encodeURIComponent(
              email
            )}`}
            className=" bg-[#800020] text-[#F4F1ED] px-16 py-2 rounded-md w-fit font-medium text-[1.1rem] mx-auto cursor-pointer "
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
  const [error, setError] = useState("");
  const router = useRouter();
  // const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { setUserData } = useData();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    const minLength = /^.{8,}$/;
    const hasNumber = /\d/;
    const hasUppercase = /[A-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(password))
      return "Password must be at least 8 characters long.";
    if (!hasUppercase.test(password))
      return "Password must include at least one uppercase letter.";
    if (!hasNumber.test(password))
      return "Password must include at least one number.";
    if (!hasSpecialChar.test(password))
      return "Password must include at least one special character.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    try {
      setError("");
      // setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      console.log(data);

      setSuccess(true);
      setTimeout(() => {
        router.push("/planer?query=overview");
        setUserData({
          ...data?.user,
          token: data?.token,
        });
        // setError("success")
      }, 2000);
    } catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("Something went wrong");
  }
}
 finally {
      // setLoading(false);
    }
  };

  return (
    <div>
      <div className=" text-[1.4rem] text-[#d1d1d1] font-semibold ">
        Step 1 of 3
      </div>
      <h2 className=" text-[3rem] font-bold max-w-[35rem] leading-tight mt-[.5rem] mb-[1.5rem] ">
        Create a password to start your membership
      </h2>
      <div className=" text-[1.5rem] ">
        <p>You&apos;re almost there! Just a couple more steps to go.</p>
        <p>Don&apos;t worry — we&apos;ll keep it quick!</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className=" mt-[2rem] max-w-[30rem] space-y-4 "
      >
        <input
          type="text"
          placeholder="Enter email"
          name=""
          className=" border border-[#585858] rounded-md outline-none bg-transparent py-2 px-3 w-full text-[1.1rem] "
          value={email}
          disabled
        />
        <div>
          <input
            type="password"
            placeholder="Enter Password"
            className="border border-[#585858] rounded-md outline-none bg-transparent py-2 px-3 w-full text-[1.1rem]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-sm text-gray-400 mt-1">
            Password must be at least 8 characters and include an uppercase
            letter, lowercase letter, number, and special character.
          </p>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className=" pt-[1rem] w-full ">
          <button className=" w-full flex items-center justify-center h-[2.5rem] rounded-md px-10 bg-[#800020] text-[#F4F1ED] font-medium text-[1.1rem] transition-all duration-300 ease-in-out ">
            {success ? (
              <div className=" flex items-center gap-2 text-green-500 ">
                <GiCheckMark className="  " />
                <span>Success</span>
              </div>
            ) : (
              // : loading ? (
              //   "Processing..."
              // )
              "Next"
            )}
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
