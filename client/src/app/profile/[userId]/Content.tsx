"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { RiHome9Line, RiSave2Line } from "react-icons/ri";
import ProfileImg from "@/assets/ProfileImg.png";
import Image from "next/image";
import { FaArrowRightLong, FaMinus, FaPlus, FaXmark } from "react-icons/fa6";
import { AiOutlineCamera, AiOutlineEye } from "react-icons/ai";
import { FaHeart, FaRegHeart, FaSave } from "react-icons/fa";
import { SignOutButton } from "@/utils/Util";
import { useData } from "@/context/Context";
import { FetchLoading, PageLoading } from "@/utils/Loading";
import { uploadFile, uploadVideo } from "@/utils/imageUpload";
import { IoIosArrowDown } from "react-icons/io";
import { FiVideo } from "react-icons/fi";
import Logo from "@/assets/Logo.png";
import { SlCloudUpload } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import { GiCheckMark } from "react-icons/gi";

interface UserType {
  _id: string;
  email: string;
  profileImg: string;
  description?: string;
  userName?: string;
  name?: string;
  identity?: string;
  age?: number;
  nationality?: string;
  eyeColor?: string;
  hairColor?: string;
  height?: string;
  view?: number;
  react?: number;
  isPlanActive: boolean;
  planDuration: number;
  remainingDays?: number;
  onlyFansInfo?: {
    video?: number | null;
    img?: number | null;
    react?: number | null;
    imgs?: string[];
    videos?: string;
  };
}

interface ContentProps {
  user: UserType | null;
}

const Content = ({ user }: ContentProps) => {
  const [formData, setFormData] = useState({
    description: user?.description || "",
    email: user?.email || "",
    profileImg: user?.profileImg || "",
    userName: user?.userName || "",
    name: user?.name || "",
    identity: user?.identity || "Select Identity",
    age: user?.age || null,
    nationality: user?.nationality || "Select Nationality",
    eyeColor: user?.eyeColor || "Select Color",
    hairColor: user?.hairColor || "Select Color",
    height: user?.height || "Select Height",
    view: user?.view || 0,
    react: user?.react || 0,
    remainingDays: user?.remainingDays || 0,
    onlyFansInfo: {
      video: user?.onlyFansInfo?.video ?? null,
      img: user?.onlyFansInfo?.img ?? null,
      react: user?.onlyFansInfo?.react ?? null,
      imgs: user?.onlyFansInfo?.imgs ?? [],
      videos: user?.onlyFansInfo?.videos ?? "",
    },
  });

  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  if (!isClientReady) {
    return <PageLoading />;
  }

  // console.log(user);

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

        <div className="  flex md:flex-row flex-col 2xl:border-x border-[#353535]  min-h-[100vh]">
          <AccountManagement
            formData={formData}
            setFormData={setFormData}
            user={user}
          />
          <AccountInformation formData={formData} setFormData={setFormData} />
        </div>
      </div>
    </div>
  );
};

export default Content;

type FormDataType = {
  email: string;
  profileImg: string;
  description: string;
  userName: string;
  name: string;
  identity: string;
  age: number | null;
  nationality: string;
  eyeColor: string;
  hairColor: string;
  height: string;
  view: number;
  react: number;
  remainingDays: number;
  onlyFansInfo: {
    video: number | null;
    img: number | null;
    react: number | null;
    imgs: string[];
    videos: string;
  };
};

interface AccountInformationProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

interface AccountManagementProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  user: UserType | null;
}

const AccountManagement: React.FC<AccountManagementProps> = ({
  formData,
  setFormData,
  user,
}) => {
  const { userData, setUserData } = useData();
  // const [selectedProfileImg, setSelectedProfileImg] = useState(
  //   userData?.profileImg || ""
  // );
  // const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isImgChanged, setIsImgChanged] = useState(false);
  const [updateField, setUpdateField] = useState("");
  const [toastMessage, setToastMessage] = useState({
    type: "",
    message: "",
    msgFor: "",
  });
  const [emailChangeData, setEmailChangeData] = useState({
    password: "",
    newEmail: "",
    confirmEmail: "",
  });
  const [passwordChangeData, setPasswordChangeData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    const maxSize = 5 * 1024 * 1024;

    if (selectedFile) {
      if (selectedFile.size <= maxSize) {
        // setErrors((prev) => ({ ...prev, file: null }));
        setLoading(true);

        try {
          const uploadedUrl = await uploadFile(selectedFile);
          if (uploadedUrl) {
            // setSelectedProfileImg(uploadedUrl);
            setFormData({
              ...formData,
              profileImg: uploadedUrl,
            });
            setIsImgChanged(true);
          } else {
            // setErrors((prev) => ({
            //   ...prev,
            //   file: "Failed to upload file to Cloudinary.",
            // }));
          }
        } catch (error) {
          console.error("Upload error:", error);
          // setErrors((prev) => ({
          //   ...prev,
          //   file: "An error occurred while uploading the file.",
          // }));
        } finally {
          setLoading(false);
        }
      } else {
        // setErrors((prev) => ({
        //   ...prev,
        //   file: "File size must be less than 5 MB.",
        // }));
      }
    }
  };

  const handleFileSubmit = async () => {
    if (!userData.token) {
      setToastMessage({
        type: "ERROR",
        message: "Something went wrong!!",
        msgFor: "FILE",
      });
    }

    // const payload: { [key: string]: any } = {};

    const payload: Record<string, unknown> = {};

    if (formData.profileImg?.trim())
      payload.profileImg = formData.profileImg.trim();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userData?._id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        console.log("User updated:", data.user);
        setToastMessage({
          type: "SUCCESS",
          message: "Profile Image Updated Successfully!!",
          msgFor: "FILE",
        });
        setIsImgChanged(false);
      } else {
        console.error("Update failed:", data.message);
        setToastMessage({
          type: "ERROR",
          message: "Failed to update profile!!",
          msgFor: "FILE",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setToastMessage({
        type: "ERROR",
        message: "Failed to update profile!!",
        msgFor: "FILE",
      });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailChangeData({
      ...emailChangeData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordChangeData({
      ...passwordChangeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeEmailSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!userData?.token || !userData?._id) {
      setToastMessage({
        type: "ERROR",
        message: "Something went wrong!!",
        msgFor: "EMAIL",
      });
      return;
    }

    const payload = {
      password: emailChangeData.password?.trim(),
      newEmail: emailChangeData.newEmail?.trim(),
      confirmEmail: emailChangeData.confirmEmail?.trim(),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userData._id}/change-email`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setUpdateField("");
        setUserData({
          ...userData,
          email: emailChangeData.newEmail,
        });
        setEmailChangeData({
          password: "",
          newEmail: "",
          confirmEmail: "",
        });
        setToastMessage({
          type: "SUCCESS",
          message: "Email changed successfully!",
          msgFor: "EMAIL",
        });
      } else {
        setToastMessage({
          type: "ERROR",
          message: data.message || "Failed to change email",
          msgFor: "EMAIL",
        });
      }
    } catch (error) {
      console.error("Email update error:", error);
      setToastMessage({
        type: "ERROR",
        message: "Something went wrong!!",
        msgFor: "EMAIL",
      });
    }
  };

  const handleChangePasswordSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!userData?.token) {
      setToastMessage({
        type: "ERROR",
        message: "Something went wrong!!",
        msgFor: "PASSWORD",
      });
      return;
    }

    const payload = {
      oldPassword: passwordChangeData.oldPassword?.trim(),
      newPassword: passwordChangeData.newPassword?.trim(),
      confirmPassword: passwordChangeData.confirmPassword?.trim(),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userData._id}/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setUpdateField("");
        setPasswordChangeData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setToastMessage({
          type: "SUCCESS",
          message: "Password changed successfully!",
          msgFor: "PASSWORD",
        });
      } else {
        setToastMessage({
          type: "ERROR",
          message: data.message || "Failed to change password",
          msgFor: "PASSWORD",
        });
      }
    } catch (error) {
      console.error("Password update error:", error);
      setToastMessage({
        type: "ERROR",
        message: "Something went wrong!!",
        msgFor: "PASSWORD",
      });
    }
  };

  return (
    <div className=" pt-[7rem] w-full md:max-w-[20rem] lg:max-w-[25rem] md:border-r border-[#353535] md:pr-3 lg:pl-[2rem] lg:pr-[2rem] pb-[2rem] ">
      <h4>Account Management</h4>

      <div className=" relative mt-[2rem] bg-[#9b1c1cb7] p-[.5rem] rounded-lg ">
        {loading && <FetchLoading />}
        <div
          onClick={() => {
            setFormData({
              ...formData,
              profileImg: "",
            });
            setIsImgChanged(true);
          }}
          className={` ${
            loading ? "hidden" : ""
          } cursor-pointer absolute right-3 top-3 p-2 z-40 shadow-inner bg-[#9b1c1cb7] rounded-full text-[#fff] w-fit text-[1.5rem] `}
        >
          <FaXmark />
        </div>
        <div
          onClick={handleFileSubmit}
          className={` ${
            isImgChanged ? "" : "hidden"
          } cursor-pointer absolute left-0 bottom-0 w-full p-2 z-50 shadow-inner bg-[#9b1c1cb7] rounded-md px-5 text-[#fff] flex items-center justify-center gap-2  `}
        >
          <FaSave />
          <span>Save</span>
        </div>
        <div className=" w-full h-[18rem] md:h-[15rem] lg:h-[20rem] relative rounded-lg ">
          <Image
            src={formData.profileImg || ProfileImg}
            alt="ProfileImg"
            fill
            className=" w-full h-auto object-contain rounded-lg "
          />
        </div>
      </div>

      {toastMessage.msgFor === "FILE" &&
        toastMessage.type &&
        toastMessage.message && (
          <p
            className={` mt-1 ${
              toastMessage.type === "ERROR" ? "text-red-500" : "text-green-500"
            } `}
          >
            {toastMessage.message}
          </p>
        )}

      <div className=" mt-2 p-2 bg-[#800020de] rounded-md ">
        <div
          onClick={() => document.getElementById("profileImgClick")?.click()}
          className=" bg-[#800020] rounded-md cursor-pointer text-[1rem]  font-medium text-center py-2 "
        >
          Upload Photo
          <input
            id="profileImgClick"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      <div className=" flex items-center gap-6 justify-center mt-[2rem] ">
        <div className=" flex items-center gap-1 ">
          <div className=" text-[1.5rem]  ">
            <AiOutlineEye />
          </div>
          <span>{formData.view}</span>
        </div>
        <div className=" flex items-center gap-1 ">
          <div className=" text-[1.3rem] ">
            <FaHeart className=" text-red-500 " />
          </div>
          <span>{formData.react}</span>
        </div>
      </div>

      <div className=" mt-[2rem] ">
        {updateField ? (
          <div className=" flex justify-end ">
            <div
              onClick={() => setUpdateField("")}
              className=" p-2 text-[1.4rem] cursor-pointer bg-[#800020de] rounded-full "
            >
              <FaXmark />
            </div>
          </div>
        ) : (
          <div className="  space-y-2 ">
            <div
              onClick={() => setUpdateField("EMAIL")}
              className=" cursor-pointer bg-[#800020] rounded-md text-[1rem]  font-medium text-center py-2 "
            >
              Change Email
            </div>
            <div
              onClick={() => setUpdateField("PASSWORD")}
              className=" cursor-pointer bg-[#800020] rounded-md text-[1rem]  font-medium text-center py-2 "
            >
              Change Password
            </div>
          </div>
        )}
      </div>

      {updateField === "EMAIL" && (
        <form onSubmit={handleChangeEmailSubmit} className=" mt-[2rem] ">
          <div className=" space-y-2 ">
            <input
              type="password"
              className=" w-full py-2 px-3 bg-transparent border-2 border-[#adacaa] rounded-md outline-none  "
              placeholder="Password"
              name="password"
              value={emailChangeData.password}
              onChange={handleEmailChange}
            />
            <input
              type="email"
              className=" w-full py-2 px-3 bg-transparent border-2 border-[#adacaa] rounded-md outline-none  "
              placeholder="New Email"
              name="newEmail"
              value={emailChangeData.newEmail}
              onChange={handleEmailChange}
            />
            <input
              type="email"
              className=" w-full py-2 px-3 bg-transparent border-2 border-[#adacaa] rounded-md outline-none  "
              placeholder="Confirm New Email"
              name="confirmEmail"
              value={emailChangeData.confirmEmail}
              onChange={handleEmailChange}
            />
          </div>
          <button className=" bg-[#800020] border-2 border-[#800020] w-full py-2 rounded-md text-center mt-[1rem] ">
            Change Email
          </button>
        </form>
      )}
      {updateField === "PASSWORD" && (
        <form onSubmit={handleChangePasswordSubmit} className=" mt-[2rem] ">
          <div className=" space-y-2 ">
            <input
              type="password"
              className=" w-full py-2 px-3 bg-transparent border-2 border-[#adacaa] rounded-md outline-none  "
              placeholder="Old Password"
              name="oldPassword"
              value={passwordChangeData.oldPassword}
              onChange={handlePasswordChange}
            />
            <input
              type="password"
              className=" w-full py-2 px-3 bg-transparent border-2 border-[#adacaa] rounded-md outline-none  "
              placeholder="New Password"
              name="newPassword"
              value={passwordChangeData.newPassword}
              onChange={handlePasswordChange}
            />
            <input
              type="password"
              className=" w-full py-2 px-3 bg-transparent border-2 border-[#adacaa] rounded-md outline-none  "
              placeholder="Confirm New Password"
              name="confirmPassword"
              value={passwordChangeData.confirmPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <button className=" bg-[#800020] border-2 border-[#800020] w-full py-2 rounded-md text-center mt-[1rem] ">
            Change Password
          </button>
        </form>
      )}

      {toastMessage &&
        (toastMessage.msgFor === "EMAIL" ||
          toastMessage.msgFor === "PASSWORD") &&
        toastMessage.message &&
        toastMessage.type && (
          <p
            className={` text-sm mt-2 ${
              toastMessage.type === "ERROR" ? "text-red-500" : "text-green-500"
            } `}
          >
            {toastMessage.message}
          </p>
        )}

      <div>
        <MembershipStatus user={user} />
      </div>
    </div>
  );
};

const AccountInformation: React.FC<AccountInformationProps> = ({
  formData,
  setFormData,
}) => {
  const [toastMessage, setToastMessage] = useState({
    type: "",
    message: "",
  });
  const { userData } = useData();
  // const [isChanged, setIsChanged] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // setIsChanged(true);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    if (!userData.token) {
      setToastMessage({
        type: "ERROR",
        message: "Something went wrong!!",
      });
    }

    // const payload: { [key: string]: any } = {};

    const payload: Record<string, unknown> = {};

    if (formData.description?.trim())
      payload.description = formData.description.trim();
    if (formData.userName?.trim()) payload.userName = formData.userName.trim();
    if (formData.name?.trim()) payload.name = formData.name.trim();
    if (formData.identity && formData.identity !== "Select Identity")
      payload.identity = formData.identity;
    if (formData.nationality && formData.nationality !== "Select Nationality")
      payload.nationality = formData.nationality;
    if (formData.eyeColor && formData.eyeColor !== "Select Color")
      payload.eyeColor = formData.eyeColor;
    if (formData.hairColor && formData.hairColor !== "Select Color")
      payload.hairColor = formData.hairColor;
    if (formData.height && formData.height !== "Select Height")
      payload.height = formData.height;

    if (typeof formData.age === "number" && !isNaN(formData.age)) {
      payload.age = formData.age;
    } else if (typeof formData.age === "string") {
      const ageNum = Number(formData.age);
      if (!isNaN(ageNum)) {
        payload.age = ageNum;
      }
    }

    // const onlyFans: any = {};

    const onlyFans: Record<string, unknown> = {};

    if (
      formData.onlyFansInfo.video !== null &&
      !isNaN(formData.onlyFansInfo.video)
    ) {
      onlyFans.video = formData.onlyFansInfo.video;
    }

    if (
      formData.onlyFansInfo.img !== null &&
      !isNaN(formData.onlyFansInfo.img)
    ) {
      onlyFans.img = formData.onlyFansInfo.img;
    }

    if (
      formData.onlyFansInfo.react !== null &&
      !isNaN(formData.onlyFansInfo.react)
    ) {
      onlyFans.react = formData.onlyFansInfo.react;
    }

    if (
      formData.onlyFansInfo.imgs !== undefined &&
      Array.isArray(formData.onlyFansInfo.imgs) &&
      formData.onlyFansInfo.imgs.length > 0
    ) {
      onlyFans.imgs = formData.onlyFansInfo.imgs;
    }

    if (
      formData.onlyFansInfo.videos !== undefined &&
      typeof formData.onlyFansInfo.videos === "string" &&
      formData.onlyFansInfo.videos.trim() !== ""
    ) {
      onlyFans.videos = formData.onlyFansInfo.videos;
    }

    if (Object.keys(onlyFans).length > 0) {
      payload.onlyFansInfo = onlyFans;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userData?._id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        console.log("User updated:", data.user);
        setToastMessage({
          type: "SUCCESS",
          message: "Updated Successfully!!",
        });
        // setIsChanged(false);
      } else {
        console.error("Update failed:", data.message);
        setToastMessage({
          type: "ERROR",
          message: "Failed to update data!!",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setToastMessage({
        type: "ERROR",
        message: "Failed to update data!!",
      });
    }
  };

  // console.log(formData);

  return (
    <form
      onSubmit={handleSubmit}
      className=" pt-[2rem] md:pt-[7rem] pb-[2rem] md:pb-[5rem] md:pl-3 lg:pl-[2rem] lg:pr-[1.25rem] w-full "
    >
      {/* <div className=" flex gap-7 "> */}
      <div className=" w-full ">
        <h3 className=" text-[1.2rem] ">About me</h3>

        <div className=" mt-[2rem] w-full space-y-2 ">
          <label htmlFor="">Biographical Info</label>
          <textarea
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            className=" scrollbar-hidden p-[.7rem] outline-none border-2 border-[#800020] bg-transparent w-full rounded-md text-[#d3cdcd] "
          ></textarea>
        </div>
      </div>

      {/* <div>
          <MembershipStatus />
        </div> */}
      {/* </div> */}

      <h3 className=" mt-[3rem] text-[1.2rem] ">OnlyFans Info</h3>

      <div className=" mt-[2rem] ">
        <div className=" space-y-2 w-full ">
          <label htmlFor="" className=" text-gray-200 ">
            OnlyFans Username
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className=" w-full px-3 py-2 border-2 border-[#800020] rounded-md outline-none bg-transparent "
            placeholder="Enter username"
          />
        </div>
      </div>

      <div className=" mt-[2rem] grid grid-cols-3 gap-3  ">
        <div className=" flex flex-col items-center justify-center space-y-3 ">
          <FiVideo className=" text-[1.7rem] " />
          <input
            type="number"
            placeholder="Enter number"
            value={formData.onlyFansInfo.video ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                onlyFansInfo: {
                  ...formData.onlyFansInfo,
                  video: e.target.value === "" ? null : Number(e.target.value),
                },
              })
            }
            className=" outline-none bg-transparent py-2 text-center border-2 rounded-full w-full "
          />
        </div>
        <div className=" flex flex-col items-center justify-center space-y-3 ">
          <AiOutlineCamera className=" text-[1.7rem] " />
          <input
            type="number"
            placeholder="Enter number"
            value={formData.onlyFansInfo.img ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                onlyFansInfo: {
                  ...formData.onlyFansInfo,
                  img: e.target.value === "" ? null : Number(e.target.value),
                },
              })
            }
            className=" outline-none bg-transparent py-2 text-center border-2 rounded-full w-full "
          />
        </div>
        <div className=" flex flex-col items-center justify-center space-y-3 ">
          <FaRegHeart className=" text-[1.7rem] " />
          <input
            type="number"
            placeholder="Enter number"
            value={formData.onlyFansInfo.react ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                onlyFansInfo: {
                  ...formData.onlyFansInfo,
                  react: e.target.value === "" ? null : Number(e.target.value),
                },
              })
            }
            className=" outline-none bg-transparent py-2 text-center border-2 rounded-full w-full "
          />
        </div>
      </div>

      <div>
        <OnlyFansImgs formData={formData} setFormData={setFormData} />
      </div>
      <div>
        <OnlyFansVideo formData={formData} setFormData={setFormData} />
      </div>

      <h3 className=" mt-[3rem] text-[1.2rem] ">Personal Information</h3>

      <div className=" mt-[2rem] w-full space-y-8 ">
        <div className=" flex gap-2 w-full ">
          <div className=" space-y-2 w-full ">
            <label htmlFor="" className=" text-gray-200 ">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className=" w-full px-3 py-2 border-2 border-[#800020] rounded-md outline-none bg-transparent "
              placeholder="Enter your full name"
            />
          </div>
        </div>
        <div className=" flex gap-2 w-full ">
          <div className=" space-y-2 w-full ">
            <label htmlFor="" className=" text-gray-200 ">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className=" w-full px-3 py-2 border-2 border-[#800020] rounded-md outline-none bg-transparent "
              placeholder="Enter email"
            />
          </div>
          <IdentitySelector
            formData={formData}
            setFormData={setFormData}
            // setIsChanged={setIsChanged}
          />
        </div>
        <div className=" flex gap-2 w-full ">
          <div className=" space-y-2 w-full ">
            <label htmlFor="" className=" text-gray-200 ">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age ?? ""}
              onChange={handleChange}
              className=" w-full px-3 py-2 border-2 border-[#800020] rounded-md outline-none bg-transparent "
              placeholder="Enter your age"
            />
          </div>
          <CountrySelector
            formData={formData}
            setFormData={setFormData}
            // setIsChanged={setIsChanged}
          />
        </div>

        <div className=" flex gap-2 w-full ">
          <EyeColorSelector
            formData={formData}
            setFormData={setFormData}
            // setIsChanged={setIsChanged}
          />
          <HairColorSelector
            formData={formData}
            setFormData={setFormData}
            // setIsChanged={setIsChanged}
          />
        </div>
        <div className=" flex gap-2 w-full ">
          <HeightSelector
            formData={formData}
            setFormData={setFormData}
            // setIsChanged={setIsChanged}
          />
          {/* <HairColorSelector
            formData={formData}
            setFormData={setFormData}
            // setIsChanged={setIsChanged}
          /> */}
        </div>

        <div className=" flex justify-end ">
          {toastMessage && toastMessage.type && toastMessage.message && (
            <p
              className={` ${
                toastMessage.type === "ERROR"
                  ? "text-red-500"
                  : "text-green-500"
              } text-sm `}
            >
              {toastMessage.message}
            </p>
          )}
        </div>

        {/* {isChanged && ( */}
        <div className=" flex justify-end ">
          <button className=" bg-[#800020] px-8 py-2 rounded-md font-medium flex items-center gap-2 ">
            <RiSave2Line className=" text-[1.2rem] " />
            <span>Save</span>
          </button>
        </div>
        {/* )} */}
      </div>
    </form>
  );
};

interface MembershipStatusProps {
  user: UserType | null;
}

const MembershipStatus: React.FC<MembershipStatusProps> = ({ user }) => {
  if (!user) return null;

  return (
    <div className="w-full bg-[#131313] rounded-xl p-5 text-center shadow-md mt-[2rem] ">
      <div className=" flex items-center justify-between mb-10 ">
        <div className=" text-[#F4F1ED] text-base ">Membership Status</div>
        <div
          className={` bg-[#1b1b1b] ${
            user.isPlanActive ? "text-[#c0244b]" : "text-[#cac8c6]"
          } py-1.5 px-3 rounded-full font-semibold inline-flex items-center gap-2 `}
        >
          <GiCheckMark />
          <span className=" text-sm ">
            {user.isPlanActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="my-4">
        <div className="text-4xl font-bold text-[#941c3a] leading-none">
          {user.remainingDays}
        </div>
        <div className="text-gray-400 text-sm mt-1">days remaining</div>
      </div>

      <Link
        href={`/planer`}
        className="w-full bg-gradient-to-r from-[#000] to-[#800020] text-[#fff] py-3 px-5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 text-sm "
      >
        <span>Upgrade</span>
        <FaArrowRightLong />
      </Link>
    </div>
  );
};

const OnlyFansImgs: React.FC<AccountInformationProps> = ({
  formData,
  setFormData,
}) => {
  const [errors, setErrors] = useState<{ imgs?: string }>({});
  const [loading, setLoading] = useState(false);
  const [uploadImgOpen, setUploadImgOpen] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(event.target.files || []);
    const maxSize = 2 * 1024 * 1024;
    const maxFiles = 4;
    const existingImages = formData.onlyFansInfo?.imgs || [];

    if (existingImages.length >= maxFiles) {
      setErrors((prev) => ({
        ...prev,
        imgs: "You can upload a maximum of 4 images.",
      }));
      return;
    }

    const allowedFiles = selectedFiles.slice(
      0,
      maxFiles - existingImages.length
    );

    const validFiles: File[] = [];
    allowedFiles.forEach((file) => {
      if (file.size <= maxSize) {
        validFiles.push(file);
      } else {
        setErrors((prev) => ({
          ...prev,
          imgs: `${file.name} exceeds 2 MB size limit.`,
        }));
      }
    });

    if (validFiles.length === 0) return;

    setErrors((prev) => ({ ...prev, imgs: undefined }));
    setLoading(true);

    try {
      const uploadedUrls = (
        await Promise.all(validFiles.map(uploadFile))
      ).filter((url): url is string => url !== null);

      setFormData((prev) => ({
        ...prev,
        onlyFansInfo: {
          ...prev.onlyFansInfo,
          imgs: [...existingImages, ...uploadedUrls],
        },
      }));
    } catch (error) {
      console.error("Upload error:", error);
      setErrors((prev) => ({
        ...prev,
        imgs: "An error occurred while uploading the files.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleClearFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      onlyFansInfo: {
        ...prev.onlyFansInfo,
        imgs: prev.onlyFansInfo?.imgs?.filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <div className=" mt-[2rem] ">
      <div>
        <div className=" mt-5 flex items-center justify-between ">
          <h3 className=" font-medium text-gray-200 ">Images</h3>
          <div
            onClick={() => setUploadImgOpen(!uploadImgOpen)}
            className=" bg-[#800020] p-2 text-[1.2rem] text-[#fff] rounded-full cursor-pointer transition-all duration-300 ease-in-out "
          >
            {uploadImgOpen ? <FaMinus /> : <FaPlus />}
          </div>
        </div>

        {uploadImgOpen && (
          <div
            onClick={() =>
              document.getElementById("galleryFile-click")?.click()
            }
            className="mt-3 relative w-full flex flex-col items-center justify-center gap-4 border-2 border-[#616161] rounded-md cursor-pointer py-6 px-4"
          >
            {loading && <FetchLoading />}
            <button
              type="button"
              className="text-white transition-all duration-300 ease-in-out active:scale-95 text-[2rem] py-1 px-8 rounded-full"
            >
              <SlCloudUpload />
            </button>
            <div className="text-center text-gray-500">
              <p>
                You can upload up to 4 images. Each image must be under 2MB.
              </p>
              <p>Accepted formats: PNG, JPEG, JPG.</p>
            </div>
            <input
              id="galleryFile-click"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        )}

        {errors.imgs && (
          <p className="text-red-500 text-sm mt-2 text-center">{errors.imgs}</p>
        )}

        <div className="grid grid-cols-4 gap-2 mt-4 ">
          {formData?.onlyFansInfo?.imgs?.map((img, index) => (
            <div key={index} className="relative h-[10rem]">
              <div className="absolute flex justify-end z-40 bg-black/50 text-[#fff] p-2 right-2 top-2 rounded-full">
                <button type="button" onClick={() => handleClearFile(index)}>
                  <RxCross2 className="text-xl" />
                </button>
              </div>
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
    </div>
  );
};

const OnlyFansVideo: React.FC<AccountInformationProps> = ({
  formData,
  setFormData,
}) => {
  const [errors, setErrors] = useState<{ video?: string }>({});
  const [loading, setLoading] = useState(false);
  const [uploadVideoOpen, setUploadVideoOpen] = useState(false);

  const handleVideoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    const maxSize = 20 * 1024 * 1024; // 20 MB

    if (!file) return;

    const isAcceptedFormat = [
      "video/mp4",
      "video/quicktime",
      "video/webm",
    ].includes(file.type);
    if (!isAcceptedFormat) {
      setErrors({ video: "Unsupported format. Use MP4, MOV, or WebM." });
      return;
    }

    if (file.size > maxSize) {
      setErrors({ video: "Video size must be under 20 MB." });
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const url = await uploadVideo(file);
      if (url) {
        setFormData((prev) => ({
          ...prev,
          onlyFansInfo: {
            ...prev.onlyFansInfo,
            videos: url,
          },
        }));
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setErrors({ video: "An error occurred while uploading the video." });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveVideo = () => {
    setFormData((prev) => ({
      ...prev,
      onlyFansInfo: {
        ...prev.onlyFansInfo,
        videos: "",
      },
    }));
  };

  // console.log(formData);

  return (
    <div className="mt-10">
      <div className=" mt-5 flex items-center justify-between ">
        <h3 className=" font-medium text-gray-200 ">Video</h3>
        <div
          onClick={() => setUploadVideoOpen(!uploadVideoOpen)}
          className=" bg-[#800020] p-2 text-[1.2rem] text-[#fff] rounded-full cursor-pointer transition-all duration-300 ease-in-out "
        >
          {uploadVideoOpen ? <FaMinus /> : <FaPlus />}
        </div>
      </div>

      {uploadVideoOpen && (
        <div
          onClick={() => document.getElementById("videoFile-click")?.click()}
          className="mt-3 relative w-full flex flex-col items-center justify-center gap-4 border-2 border-[#616161] rounded-md cursor-pointer py-6 px-4"
        >
          {loading && <FetchLoading />}
          <button
            type="button"
            className="text-white transition-all duration-300 ease-in-out active:scale-95 text-[2rem] py-1 px-8 rounded-full"
          >
            <SlCloudUpload />
          </button>
          <div className="text-center text-gray-500">
            <p>Only one video allowed. Max size 20MB.</p>
            <p>Accepted formats: MP4, MOV, WebM.</p>
          </div>
          <input
            id="videoFile-click"
            type="file"
            accept="video/mp4,video/quicktime,video/webm"
            className="hidden"
            onChange={handleVideoUpload}
          />
        </div>
      )}

      {errors.video && (
        <p className="text-red-500 text-sm mt-2 text-center">{errors.video}</p>
      )}

      {formData?.onlyFansInfo?.videos && (
        <div className="relative mt-4 w-[15rem] h-[12rem]">
          <div className="absolute flex justify-end z-40 bg-black/50 text-[#fff] p-2 right-2 top-2 rounded-full">
            <button type="button" onClick={handleRemoveVideo}>
              <RxCross2 className="text-xl" />
            </button>
          </div>
          <video
            src={formData.onlyFansInfo.videos}
            controls
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
      )}
    </div>
  );
};

interface SelectorProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

const CountrySelector: React.FC<SelectorProps> = ({
  formData,
  setFormData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement | null>(null);

  const countries = [
    { name: "Norway", code: "NO" },
    { name: "Sweden", code: "SE" },
    { name: "Denmark", code: "DK" },
    { name: "Finland", code: "FI" },
    { name: "Iceland", code: "IS" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryRef.current &&
        !countryRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" space-y-2 w-full ">
      <label htmlFor="" className=" text-gray-200 ">
        Nationality
      </label>
      <div className=" border-2 border-[#800020] rounded-md ">
        <div className=" relative text-center " ref={countryRef}>
          <div
            className="w-full px-3 py-2 cursor-pointer flex items-center justify-between gap-3 text-[#d1d1d1] "
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{formData.nationality}</span>
            <IoIosArrowDown
              className={` ${
                isOpen ? "rotate-180" : ""
              } transition-all duration-300 ease-in-out text-[1.1rem] `}
            />
          </div>
          {isOpen && (
            <ul className="absolute w-full border-2 border-gray-400 rounded-lg mt-2 shadow-lg z-10 bg-[#000] max-h-[10rem] overflow-y-auto custom-scrollbar ">
              {countries.map((country, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-[#131313] cursor-pointer rounded-md "
                  onClick={() => {
                    setFormData({
                      ...formData,
                      nationality: country.name,
                      // countryCode: country.code,
                    });
                    setIsOpen(false);
                    // setIsChanged(true);
                  }}
                >
                  {country.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const IdentitySelector: React.FC<SelectorProps> = ({
  formData,
  setFormData,
  // setIsChanged,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const identityRef = useRef<HTMLDivElement | null>(null);

  const identity = [
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        identityRef.current &&
        !identityRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" space-y-2 w-full ">
      <label htmlFor="" className=" text-gray-200 ">
        Identity
      </label>
      <div className=" border-2 border-[#800020] rounded-md ">
        <div className=" relative text-center " ref={identityRef}>
          <div
            className="w-full px-3 py-2 cursor-pointer flex items-center justify-between gap-3 text-[#d1d1d1] "
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{formData.identity}</span>
            <IoIosArrowDown
              className={` ${
                isOpen ? "rotate-180" : ""
              } transition-all duration-300 ease-in-out text-[1.1rem] `}
            />
          </div>
          {isOpen && (
            <ul className="absolute w-full border-2 border-gray-700 rounded-lg mt-2 shadow-lg z-10 bg-gray-700 max-h-[10rem] overflow-y-auto custom-scrollbar ">
              {identity.map((idnt, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-gray-800 cursor-pointer rounded-md "
                  onClick={() => {
                    setFormData({
                      ...formData,
                      identity: idnt,
                    });
                    setIsOpen(false);
                    // setIsChanged(true);
                  }}
                >
                  {idnt}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const EyeColorSelector: React.FC<SelectorProps> = ({
  formData,
  setFormData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const eyeColors: string[] = [
    "Black",
    "Brown",
    "Hazel",
    "Amber",
    "Blue",
    "Gray",
    "Green",
    "Other",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" space-y-2 w-full ">
      <label htmlFor="" className=" text-gray-200 ">
        Eye Color
      </label>
      <div className=" border-2 border-[#800020] rounded-md ">
        <div className=" relative text-center " ref={ref}>
          <div
            className="w-full px-3 py-2 cursor-pointer flex items-center justify-between gap-3 text-[#d1d1d1] "
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{formData.eyeColor}</span>
            <IoIosArrowDown
              className={` ${
                isOpen ? "rotate-180" : ""
              } transition-all duration-300 ease-in-out text-[1.1rem] `}
            />
          </div>
          {isOpen && (
            <ul className="absolute w-full border-2 border-gray-400 rounded-lg mt-2 shadow-lg z-10 bg-[#000] max-h-[10rem] overflow-y-auto custom-scrollbar ">
              {eyeColors.map((color, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-[#131313] cursor-pointer rounded-md "
                  onClick={() => {
                    setFormData({
                      ...formData,
                      eyeColor: color,
                      // countryCode: country.code,
                    });
                    setIsOpen(false);
                    // setIsChanged(true);
                  }}
                >
                  {color}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const HairColorSelector: React.FC<SelectorProps> = ({
  formData,
  setFormData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const hairColors: string[] = [
    "Black",
    "Dark Brown",
    "Light Brown",
    "Blonde",
    "Red",
    "Gray",
    "White",
    "Dyed / Colored",
    "Bald / No Hair",
    "Other",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" space-y-2 w-full ">
      <label htmlFor="" className=" text-gray-200 ">
        Hair Color
      </label>
      <div className=" border-2 border-[#800020] rounded-md ">
        <div className=" relative text-center " ref={ref}>
          <div
            className="w-full px-3 py-2 cursor-pointer flex items-center justify-between gap-3 text-[#d1d1d1] "
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{formData.hairColor}</span>
            <IoIosArrowDown
              className={` ${
                isOpen ? "rotate-180" : ""
              } transition-all duration-300 ease-in-out text-[1.1rem] `}
            />
          </div>
          {isOpen && (
            <ul className="absolute w-full border-2 border-gray-400 rounded-lg mt-2 shadow-lg z-10 bg-[#000] max-h-[10rem] overflow-y-auto custom-scrollbar ">
              {hairColors.map((color, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-[#131313] cursor-pointer rounded-md "
                  onClick={() => {
                    setFormData({
                      ...formData,
                      hairColor: color,
                      // countryCode: country.code,
                    });
                    setIsOpen(false);
                    // setIsChanged(true);
                  }}
                >
                  {color}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const HeightSelector: React.FC<SelectorProps> = ({ formData, setFormData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const heights: string[] = [
    "Under 4'10\"",
    "4'10\" - 5'0\"",
    "5'1\" - 5'3\"",
    "5'4\" - 5'6\"",
    "5'7\" - 5'9\"",
    "5'10\" - 6'0\"",
    "6'1\" - 6'3\"",
    "Above 6'3\"",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" space-y-2 w-full ">
      <label htmlFor="" className=" text-gray-200 ">
        Height
      </label>
      <div className=" border-2 border-[#800020] rounded-md ">
        <div className=" relative text-center " ref={ref}>
          <div
            className="w-full px-3 py-2 cursor-pointer flex items-center justify-between gap-3 text-[#d1d1d1] "
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{formData.height}</span>
            <IoIosArrowDown
              className={` ${
                isOpen ? "rotate-180" : ""
              } transition-all duration-300 ease-in-out text-[1.1rem] `}
            />
          </div>
          {isOpen && (
            <ul className="absolute w-full border-2 border-gray-400 rounded-lg mt-2 shadow-lg z-10 bg-[#000] max-h-[10rem] overflow-y-auto custom-scrollbar ">
              {heights.map((height, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-[#131313] cursor-pointer rounded-md "
                  onClick={() => {
                    setFormData({
                      ...formData,
                      height: height,
                      // countryCode: country.code,
                    });
                    setIsOpen(false);
                    // setIsChanged(true);
                  }}
                >
                  {height}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
