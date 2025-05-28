"use client";

import { useData } from "@/context/Context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { RiHome9Line } from "react-icons/ri";
import Logo from "@/assets/Logo.png"
import Image from "next/image";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    type: "",
    message: "",
  });
  const router = useRouter();
  const { userData, setUserData } = useData();

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
      setToastMessage({
        type: "ERROR",
        message: "Please enter a valid email address.",
      });
      return;
    }

    const validationError = validatePassword(password);
    if (validationError) {
      setToastMessage({
        type: "ERROR",
        message: validationError,
      });
      return;
    }

    setToastMessage({
      type: "",
      message: "",
    });

    try {
      setToastMessage({
        type: "",
        message: "",
      });
      setIsLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
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
        setToastMessage({
          type: "ERROR",
          message: data.error || "Something went wrong",
        });
        return;
      }

      console.log(data);

      setIsSuccess(true);
      setTimeout(() => {
        setUserData({
          ...data?.user,
          token: data?.token,
        });
        router.push(`/profile/${data?.user?._id}`);
      }, 2000);
    } catch (err: any) {
      setToastMessage({
        type: "ERROR",
        message: err.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" bg-[#000000] min-h-screen h-full text-[#fff] ligin-bg ">
      <div className=" max-w-[1400px] mx-auto h-full ">
        <div className=" h-[5rem] flex items-center justify-between  ">
          <Link href={`/`} className=" text-[2rem] ">
            <Image src={Logo} alt="Logo" className=" w-[10rem] mt-5 object-contain " />
          </Link>
          <Link
            href={`/`}
            className="flex items-center gap-2 bg-[#800020] text-[#fff]  transition-colors duration-300 ease-in-out rounded-lg px-8 py-2 text-[1.1rem]  "
          >
            <RiHome9Line className=" text-[1.3rem] " />
            <span>Home</span>
          </Link>
        </div>

        <div className=" h-[calc(100vh-5rem)] flex items-center ">
          <form
            onSubmit={handleSubmit}
            className=" max-w-[40rem] bg-[#000000] mx-auto p-[2rem] rounded-lg "
          >
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" w-full py-2 px-3 border rounded-md outline-none border-[#535353] bg-transparent  "
                />
              </div>
              <div className=" text-[1.1rem] space-y-2 ">
                <label htmlFor="">Password*</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=" w-full py-2 px-3 border rounded-md outline-none border-[#535353] bg-transparent  "
                />
              </div>

              <div className=" flex justify-end ">
                <div className=" border-b text-[#c9c9c9] hover:text-[#800020] transition-colors duration-300 ease-in-out border-[#800020] cursor-pointer ">
                  Forgot Password?
                </div>
              </div>

              <div className="  ">
                {toastMessage && toastMessage.type && toastMessage.message && (
                  <p
                    className={` text-sm ${
                      toastMessage.type === "ERROR"
                        ? "text-red-500"
                        : "text-green-500"
                    } `}
                  >
                    {toastMessage.message}
                  </p>
                )}
              </div>

              <div className=" pt-[1rem]  text-[1.1rem] ">
                <button className=" w-full bg-[#800020] text-[#F4F1ED] rounded-md py-2 font-medium transition-all duration-300 ease-in-out ">
                  {isSuccess ? (
                    <div className=" flex items-center justify-center gap-2 text-green-500 ">
                      <GiCheckMark className="  " />
                      <span>Success</span>
                    </div>
                  ) : (
                    // : loading ? (
                    //   "Processing..."
                    // )
                    "Logg In"
                  )}
                </button>
              </div>

              <div className=" pt-[1rem] ">
                New to Scandify?{" "}
                <Link
                  href={`/registrering`}
                  className=" text-[#961f3c] border-b border-[#800020] font-medium "
                >
                  Sign Up Now
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
