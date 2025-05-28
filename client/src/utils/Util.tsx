import { useData } from "@/context/Context";
import { useRouter } from "next/navigation";
import React from "react";
import { GoSignOut } from "react-icons/go";

const Util = () => {
  return <div>Util</div>;
};

export default Util;

export const SignOutButton = () => {
  const { logout } = useData();
  const router= useRouter()

  return (
    <div
      onClick={()=> {
        logout()
        router.push("/")
      }}
      className="flex items-center gap-2 bg-[#800020] cursor-pointer text-[#fff]  transition-colors duration-300 ease-in-out rounded-lg px-5 md:px-8 py-2 text-[1.1rem]  "
    >
      <GoSignOut className=" text-[1.3rem] " />
      <span>Sign Out</span>
    </div>
  );
};
