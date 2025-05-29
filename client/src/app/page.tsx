"use client";

import Header from "@/components/Header";
import HomeSidebar from "@/components/HomeSidebar";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type User = {
  _id: string;
  email: string;
  profileImg?: string;
  description?: string;
  userName?: string;
  name?: string;
  identity?: string[];
  age?: number;
  nationality?: string;
  onlyFansInfo: {
    video: number | null;
    img: number | null;
    react: number | null;
  };
};

type ApiResponse = {
  data: User[];
  total: number;
  totalPages: number;
  currentPage: number;
};

type Filters = {
  page: number;
  limit: number;
  nationality?: string;
  identity: string[];
  minAge?: string;
  maxAge?: string;
};

export default function Home() {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Sory by");
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [fetching, setFetching] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setOptionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    limit: 20,
    identity: [],
  });
  // const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  // const fetchUsers = async () => {
  //   try {
  //     const params: any = { ...filters };
  //     if (!params.nationality) delete params.nationality;
  //     if (!params.identity || params.identity.length === 0) delete params.identity;
  //     if (!params.minAge) delete params.minAge;
  //     if (!params.maxAge) delete params.maxAge;

  //     console.log(params);

  //     const res = await axios.get<ApiResponse>(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/users`,
  //       {
  //         params,
  //       }
  //     );

  //     setUsers(res.data.data);
  //     setTotalPages(res.data.totalPages);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  // const handleIdentityChange = (value: string) => {
  //   setFilters((prev) => {
  //     const updated = prev.identity.includes(value)
  //       ? prev.identity.filter((v) => v !== value)
  //       : [...prev.identity, value];
  //     return { ...prev, identity: updated, page: 1 };
  //   });
  // };

  const fetchUsers = async () => {
    try {

      setFetching(true)

      const query = new URLSearchParams();

      if (filters.page) query.append("page", String(filters.page));
      if (filters.limit) query.append("limit", String(filters.limit));
      if (filters.nationality) query.append("nationality", filters.nationality);
      if (filters.minAge) query.append("minAge", filters.minAge);
      if (filters.maxAge) query.append("maxAge", filters.maxAge);
      if (filters.identity.length > 0) {
        filters.identity.forEach((value) => {
          query.append("identity", value);
        });
      }

      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/user/users?${query.toString()}`
      );

      if (!res.ok) {
        // throw new Error(`HTTP error! status: ${res.status}`);
        console.log(`HTTP error! status: ${res.status}`);
        return;
      }

      const data: ApiResponse = await res.json();

      setUsers(data.data);
      // setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally{
      setFetching(false)
    }
  };

  // const goToPage = (pageNumber: number) => {
  //   setFilters((prev) => ({ ...prev, page: pageNumber }));
  // };

  // console.log(users);

  return (
    <div>
      <Header />
      <div className=" bg-gradient-to-tr from-[#000] via-[#000] to-[#470012] text-[#fff] min-h-[100vh] pt-[5rem] full-bg pb-[1rem] ">
        <div className=" max-w-[1400px] mx-auto pt-[4rem] flex gap-10 lg:gap-20 px-3 ">
          <HomeSidebar filters={filters} setFilters={setFilters} isOpen={isOpen} toggleSidebar={toggleSidebar} />
          <div className=" w-full md:w-2/3 relative ">
            <div className=" flex justify-between md:justify-end ">

              <div onClick={toggleSidebar} className="  cursor-pointer md:hidden flex items-center gap-2 bg-[#800020] px-5 py-2 rounded-lg ">
                <TbColorFilter className=" text-[1.1rem] " />
                <span>Filter</span>
              </div>

              <div className="w-[10rem] relative text-center " ref={optionsRef}>
                <div
                  className="w-full px-4 py-2 border-2 border-gray-700 rounded-md cursor-pointer flex items-center justify-center gap-3 text-[#d1d1d1] "
                  onClick={() => setOptionsOpen(!optionsOpen)}
                >
                  <span>{selectedSort}</span>
                  <IoIosArrowDown
                    className={` ${
                      optionsOpen ? "rotate-180" : ""
                    } transition-all duration-300 ease-in-out text-[1.1rem] `}
                  />
                </div>
                {optionsOpen && (
                  <ul className="absolute w-full border-2 border-gray-700 rounded-lg mt-1 shadow-lg bg-black z-10">
                    {["Info", "Warning", "Alert"].map((option) => (
                      <li
                        key={option}
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer rounded-md "
                        onClick={() => {
                          setSelectedSort(option);
                          setOptionsOpen(false);
                        }}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className=" mt-[2rem] md:mt-[.8rem] ">
              {
                fetching ? <FetchLoading /> : <Profiles users={users} />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type ProfilesProps = {
  users: User[];
};

import ProfileImg from "@/assets/ProfileImg.png";
import { FiVideo } from "react-icons/fi";
import Link from "next/link";
import { AiOutlineCamera } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { TbColorFilter } from "react-icons/tb";
import { FetchLoading } from "@/utils/Loading";

const Profiles = ({ users }: ProfilesProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
      {users.map((user) => (
        <div
          key={user._id}
          className="  border-[#4d4d4d] w-full rounded-2xl overflow-hidden shadow"
        >
          <div className=" w-full h-[10rem] relative bg-gradient-to-tr from-black to-[#800020]/70 ">
            <Image
              src={user.profileImg || ProfileImg}
              alt="Profile Img"
              fill
              className=" w-full h-full object-cover object-center "
            />
          </div>
          <div className=" bg-[#20050c] pt-1 px-3 pb-3 ">
            <div className="font-semibold text-center ">
              {user.userName || "username"}
            </div>
            <div className=" grid grid-cols-3 gap-4 pt-3 ">
              <div className=" flex flex-col gap-1 justify-center items-center w-full ">
                <FiVideo className=" text-[1.4rem] " />
                <div className=" text-[#cac8c6] ">
                  {user.onlyFansInfo.video}
                </div>
              </div>
              <div className=" flex flex-col gap-1 justify-center items-center w-full ">
                <AiOutlineCamera className=" text-[1.4rem] " />
                <div className=" text-[#cac8c6] ">{user.onlyFansInfo.img}</div>
              </div>
              <div className=" flex flex-col gap-1 justify-center items-center w-full ">
                <FaRegHeart className=" text-[1.4rem] " />
                <div className=" text-[#cac8c6] ">
                  {user.onlyFansInfo.react}
                </div>
              </div>
            </div>
            <div className=" w-full mt-[1rem] ">
              <Link
                href={`/profile-view/${user._id}`}
                className=" block w-full py-2 px-2 text-center bg-[#800020] text-[#fff] rounded-full "
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
