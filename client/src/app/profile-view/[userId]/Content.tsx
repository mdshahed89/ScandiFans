"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiHome9Line } from "react-icons/ri";
import ProfileImg from "@/assets/ProfileImg.png";
import Image from "next/image";
import { AiOutlineCamera, AiOutlineEye } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { SignOutButton } from "@/utils/Util";
import { PageLoading } from "@/utils/Loading";
import { FiVideo } from "react-icons/fi";
import Logo from "@/assets/Logo.png";
import KissIcon from "@/assets/KissIcon.png";

interface ContentProps {
  user: {
    _id: string;
    email: string;
    profileImg: string;
    description?: string;
    userName?: string;
    name?: string;
    identity?: string;
    age?: number;
    nationality?: string;
    view?: number;
    react?: number;
    onlyFansInfo?: {
      video?: number | null;
      img?: number | null;
      react?: number | null;
      imgs?: string[];
      videos?: string;
    };
  } | null;
}

const Content = ({ user }: ContentProps) => {
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  if (!isClientReady) {
    return <PageLoading />;
  }

  if (!user) return <p>User not found</p>;

  return (
    <div className=" bg-gradient-to-tr from-[#000] via-[#000] to-[#470012] min-h-screen h-full text-[#fff] ">
      <div className=" max-w-[1400px] mx-auto h-full px-3 ">
        <div className=" fixed bg-gradient-to-r from-[#000] to-[#470012] left-0 top-0 w-full border-b border-[#353535] z-50 ">
          <div className=" max-w-[1400px] px-3 mx-auto h-[5rem] flex items-center justify-between  ">
            <Link href={`/`} className=" text-[2rem] ">
              <Image
                src={Logo}
                alt="Logo"
                className=" w-[10rem] mt-5 object-contain "
              />
            </Link>
            <div className=" flex items-center gap-2 ">
              <Link
                href={`/`}
                className=" hidden md:flex items-center gap-2 bg-[#800020] text-[#fff]  transition-colors duration-300 ease-in-out rounded-lg px-5 md:px-8 py-2 text-[1.1rem]  "
              >
                <RiHome9Line className=" text-[1.3rem] " />
                <span>Home</span>
              </Link>
              <Link
                href={`/`}
                className=" md:hidden flex items-center gap-2 bg-[#800020] text-[#fff]  transition-colors duration-300 ease-in-out rounded-full px-3 py-3 text-[1.1rem]  "
              >
                <RiHome9Line className=" text-[1.3rem] " />
              </Link>
              <SignOutButton />
            </div>
          </div>
        </div>

        <div className="  flex md:flex-row flex-col gap-10 md:gap-5 lg:gap-10 border-[#353535]  min-h-[100vh]">
          <AccountManagement user={user} />
          <AccountInformation user={user} />
        </div>
      </div>
    </div>
  );
};

export default Content;

const AccountManagement = ({ user }: ContentProps) => {
  if (!user) return null;

  return (
    <div className=" pt-[7rem] w-full md:max-w-[20rem] lg:max-w-[23rem] border-[#353535] pb-[2rem] ">
      <div className=" bg-gradient-to-tr from-[#800020] via-[#000000] to-[#800020] border-2 border-[#800020] relative p-[.5rem] rounded-lg ">
        <div className=" w-full h-[18rem] md:h-[15rem] lg:h-[20rem] relative rounded-lg ">
          <Image
            src={user.profileImg || ProfileImg}
            alt="ProfileImg"
            fill
            className=" w-full h-auto object-contain rounded-lg "
          />
        </div>
      </div>

      {/* <div className=" flex items-center justify-around gap-6 "> */}
      {/* <div className=" mt-3 text-center space-y-1 ">
          <div className=" text-gray-300 ">@{user.userName}</div>
          <div className=" text-[1.3rem] ">{user.name}</div>
        </div> */}

      <div className=" flex items-center justify-center gap-2 mt-[1rem] ">
        <div className=" flex items-center gap-1 ">
          <div className=" text-[1.5rem]  ">
            <AiOutlineEye />
          </div>
          <span>{user.view}</span>
        </div>
        <div className=" flex items-center gap-1 ">
          <div className=" text-[1.3rem] ">
            <FaHeart className=" text-red-500 " />
          </div>
          <span>{user.react}</span>
        </div>
      </div>
      {/* </div> */}

      <div>
        <OnlyFansImgs user={user} />
      </div>
      <div>
        <OnlyFansVideo user={user} />
      </div>
    </div>
  );
};

const AccountInformation = ({ user }: ContentProps) => {
  if (!user) return null;

  return (
    <div className=" pt-[2rem] md:pt-[7rem] pb-[2rem] md:pb-[5rem] md:pl-3 lg:pl-[2rem] lg:pr-[1.25rem] w-full ">
      <div className="  w-full space-y-6 ">
        <label htmlFor="">Biographical Info</label>
        <p className=" text-gray-300 ">{user.description}</p>
      </div>

      <div className=" mt-[3rem] ">
        <h3 className=" mt-[3rem] ">OnlyFans Info</h3>

        <div className=" mt-[2rem] grid grid-cols-3 gap-3  ">
          <div className=" flex flex-col items-center justify-center space-y-3 ">
            <FiVideo className=" text-[1.7rem] " />
            <div className=" bg-transparent py-2 text-center border-2 border-[#800020] rounded-full w-full ">
              {user.onlyFansInfo?.video}
            </div>
          </div>
          <div className=" flex flex-col items-center justify-center space-y-3 ">
            <AiOutlineCamera className=" text-[1.7rem] " />
            <div className=" bg-transparent py-2 text-center border-2 border-[#800020] rounded-full w-full ">
              {user.onlyFansInfo?.img}
            </div>
          </div>
          <div className=" flex flex-col items-center justify-center space-y-3 ">
            <FaRegHeart className=" text-[1.7rem] " />
            <div className=" bg-transparent py-2 text-center border-2 border-[#800020] rounded-full w-full ">
              {user.onlyFansInfo?.react}
            </div>
          </div>
        </div>

        <div className=" mt-[2rem] ">
          <div className=" flex items-center gap-1 ">
            <p>Want to talk to me? I only respond on OnlyFans</p>
            <Image
              src={KissIcon}
              alt="Kiss icon"
              className=" w-[1.5rem] object-contain "
            />
          </div>

          <div className=" mt-6 ">
            <Link
              target="_blank"
              href={`https://onlyfans.com/${user.userName}`}
              className="  px-8 py-3 rounded-lg bg-[#800020] border-2 border-[#800020] text-[#F4F1ED] "
            >
              Join Me on OnlyFans
            </Link>
          </div>
        </div>
      </div>

      <div className=" mt-[3rem] max-w-[25rem] ">
        <h3 className=" ">Personal Information</h3>
        <div className=" mt-[2rem] space-y-3 ">
          {user.userName && (
            <div className=" flex items-center justify-between ">
              <h3 className=" ">OnlyFans Username:</h3>
              <p className=" text-gray-300 ">{user.userName}</p>
            </div>
          )}
          {user.name && (
            <div className=" flex items-center justify-between ">
              <h3 className=" ">Full Name:</h3>
              <p className=" text-gray-300 ">{user.name}</p>
            </div>
          )}
          {user.identity && (
            <div className=" flex items-center justify-between ">
              <h3 className=" ">Identity:</h3>
              <p className=" text-gray-300 ">{user.identity}</p>
            </div>
          )}
          {user.age && (
            <div className=" flex items-center justify-between ">
              <h3 className=" ">Age:</h3>
              <p className=" text-gray-300 ">{user.age}</p>
            </div>
          )}
          {user.nationality && (
            <div className=" flex items-center justify-between ">
              <h3 className=" ">Nationility:</h3>
              <p className=" text-gray-300 ">{user.nationality}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OnlyFansImgs = ({ user }: ContentProps) => {
  if (!user) return null;

  return (
    <div className="mt-[2rem]">
      <div className="grid grid-cols-2 gap-2 mt-4">
        {user?.onlyFansInfo?.imgs?.map((img, index) => (
          <div key={index} className="relative h-[10rem]">
            <div className="relative w-full h-full rounded-lg p-2">
              <Image
                loading="lazy"
                placeholder="blur"
                src={img}
                alt={`gallery-img-${index}`}
                fill
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2NjY2MiLz48L3N2Zz4="
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OnlyFansVideo = ({ user }: ContentProps) => {
  if (!user) return null;

  return (
    <div className="mt-5">
      {user?.onlyFansInfo?.videos && (
        <div className="relative mt-4 w-full h-[15rem]">
          <video
            src={user.onlyFansInfo.videos}
            controls
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
      )}
    </div>
  );
};
