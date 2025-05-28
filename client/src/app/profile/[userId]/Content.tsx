"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { RiHome9Line, RiSave2Line } from "react-icons/ri";
import ProfileImg from "@/assets/ProfileImg.png";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";
import { AiOutlineCamera, AiOutlineEye } from "react-icons/ai";
import { FaHeart, FaRegHeart, FaSave } from "react-icons/fa";
import { SignOutButton } from "@/utils/Util";
import { useData } from "@/context/Context";
import { FetchLoading, PageLoading } from "@/utils/Loading";
import { uploadFile } from "@/utils/imageUpload";
import { IoIosArrowDown } from "react-icons/io";
import { FiVideo } from "react-icons/fi";
import Logo from "@/assets/Logo.png";

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
    };
  } | null;
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
    view: user?.view || 0,
    react: user?.react || 0,
    onlyFansInfo: {
      video: user?.onlyFansInfo?.video ?? null,
      img: user?.onlyFansInfo?.img ?? null,
      react: user?.onlyFansInfo?.react ?? null,
    },
  });

  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  if (!isClientReady) {
    return <PageLoading />;
  }

  if (!user) return <p>User not found</p>;

  return (
    <div className=" bg-[#000000] min-h-screen h-full text-[#fff] ">
      <div className=" max-w-[1400px] mx-auto h-full px-3 ">
        <div className=" fixed bg-[#000000] left-0 top-0 w-full border-b border-[#353535] z-50 ">
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
          <AccountManagement formData={formData} setFormData={setFormData} />
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
  view: number;
  react: number;
  onlyFansInfo: {
    video: number | null;
    img: number | null;
    react: number | null;
  };
};

interface AccountManagementProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

const AccountManagement: React.FC<AccountManagementProps> = ({
  formData,
  setFormData,
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
    <div className=" pt-[7rem] w-full md:max-w-[20rem] lg:max-w-[25rem] md:border-r border-[#353535] md:pr-3 lg:pl-[1.25rem] lg:pr-[2rem] pb-[2rem] ">
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
          } cursor-pointer absolute right-3 top-3 p-2 z-50 shadow-inner bg-[#9b1c1cb7] rounded-full text-[#fff] w-fit text-[1.5rem] `}
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
    </div>
  );
};

const AccountInformation: React.FC<AccountManagementProps> = ({
  formData,
  setFormData,
}) => {
  const [toastMessage, setToastMessage] = useState({
    type: "",
    message: "",
  });
  const { userData } = useData();
  const [isChanged, setIsChanged] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsChanged(true);
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
    // if (typeof formData.age === "number" && !isNaN(formData.age))
    //   payload.age = formData.age;

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
        setIsChanged(false);
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

  console.log(formData);

  return (
    <form
      onSubmit={handleSubmit}
      className=" pt-[2rem] md:pt-[7rem] pb-[2rem] md:pb-[5rem] md:pl-3 lg:pl-[2rem] lg:pr-[1.25rem] w-full "
    >
      <h3>About me</h3>

      <div className=" w-full mt-[2rem] space-y-2 ">
        <label htmlFor="">Biographical Info</label>
        <textarea
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className=" p-[.7rem] outline-none border-2 border-[#800020] bg-transparent w-full rounded-md text-[#d3cdcd] "
        ></textarea>
      </div>

      <h3 className=" mt-[3rem] ">OnlyFans Info</h3>

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

      <h3 className=" mt-[3rem] ">Personal Information</h3>

      <div className=" mt-[2rem] w-full space-y-8 ">
        <div className=" flex gap-2 w-full ">
          <div className=" space-y-2 w-full ">
            <label htmlFor="">Username</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className=" w-full px-3 py-2 border-2 border-[#800020] rounded-md outline-none bg-transparent "
              placeholder="Enter username"
            />
          </div>
          <div className=" space-y-2 w-full ">
            <label htmlFor="">Full Name</label>
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
            <label htmlFor="">Email</label>
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
            setIsChanged={setIsChanged}
          />
        </div>
        <div className=" flex gap-2 w-full ">
          <div className=" space-y-2 w-full ">
            <label htmlFor="">Age</label>
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
            setIsChanged={setIsChanged}
          />
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

        {isChanged && (
          <div className=" flex justify-end ">
            <button className=" bg-[#800020] px-8 py-2 rounded-md font-medium flex items-center gap-2 ">
              <RiSave2Line className=" text-[1.2rem] " />
              <span>Save</span>
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

interface SelectorProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

const CountrySelector: React.FC<SelectorProps> = ({
  formData,
  setFormData,
  setIsChanged,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement | null>(null);

  // const handleChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const countries = [
    { name: "Afghanistan", code: "AF" },
    { name: "Albania", code: "AL" },
    { name: "Algeria", code: "DZ" },
    { name: "Andorra", code: "AD" },
    { name: "Angola", code: "AO" },
    { name: "Antigua and Barbuda", code: "AG" },
    { name: "Argentina", code: "AR" },
    { name: "Armenia", code: "AM" },
    { name: "Australia", code: "AU" },
    { name: "Austria", code: "AT" },
    { name: "Azerbaijan", code: "AZ" },
    { name: "Bahamas", code: "BS" },
    { name: "Bahrain", code: "BH" },
    { name: "Bangladesh", code: "BD" },
    { name: "Barbados", code: "BB" },
    { name: "Belarus", code: "BY" },
    { name: "Belgium", code: "BE" },
    { name: "Belize", code: "BZ" },
    { name: "Benin", code: "BJ" },
    { name: "Bhutan", code: "BT" },
    { name: "Bolivia", code: "BO" },
    { name: "Bosnia and Herzegovina", code: "BA" },
    { name: "Botswana", code: "BW" },
    { name: "Brazil", code: "BR" },
    { name: "Brunei", code: "BN" },
    { name: "Bulgaria", code: "BG" },
    { name: "Burkina Faso", code: "BF" },
    { name: "Burundi", code: "BI" },
    { name: "Cabo Verde", code: "CV" },
    { name: "Cambodia", code: "KH" },
    { name: "Cameroon", code: "CM" },
    { name: "Canada", code: "CA" },
    { name: "Central African Republic", code: "CF" },
    { name: "Chad", code: "TD" },
    { name: "Chile", code: "CL" },
    { name: "China", code: "CN" },
    { name: "Colombia", code: "CO" },
    { name: "Comoros", code: "KM" },
    { name: "Congo (Congo-Brazzaville)", code: "CG" },
    { name: "Costa Rica", code: "CR" },
    { name: "Croatia", code: "HR" },
    { name: "Cuba", code: "CU" },
    { name: "Cyprus", code: "CY" },
    { name: "Czech Republic", code: "CZ" },
    { name: "Democratic Republic of the Congo", code: "CD" },
    { name: "Denmark", code: "DK" },
    { name: "Djibouti", code: "DJ" },
    { name: "Dominica", code: "DM" },
    { name: "Dominican Republic", code: "DO" },
    { name: "Ecuador", code: "EC" },
    { name: "Egypt", code: "EG" },
    { name: "El Salvador", code: "SV" },
    { name: "Equatorial Guinea", code: "GQ" },
    { name: "Eritrea", code: "ER" },
    { name: "Estonia", code: "EE" },
    { name: "Eswatini", code: "SZ" },
    { name: "Ethiopia", code: "ET" },
    { name: "Fiji", code: "FJ" },
    { name: "Finland", code: "FI" },
    { name: "France", code: "FR" },
    { name: "Gabon", code: "GA" },
    { name: "Gambia", code: "GM" },
    { name: "Georgia", code: "GE" },
    { name: "Germany", code: "DE" },
    { name: "Ghana", code: "GH" },
    { name: "Greece", code: "GR" },
    { name: "Grenada", code: "GD" },
    { name: "Guatemala", code: "GT" },
    { name: "Guinea", code: "GN" },
    { name: "Guinea-Bissau", code: "GW" },
    { name: "Guyana", code: "GY" },
    { name: "Haiti", code: "HT" },
    { name: "Honduras", code: "HN" },
    { name: "Hungary", code: "HU" },
    { name: "Iceland", code: "IS" },
    { name: "India", code: "IN" },
    { name: "Indonesia", code: "ID" },
    { name: "Iran", code: "IR" },
    { name: "Iraq", code: "IQ" },
    { name: "Ireland", code: "IE" },
    { name: "Israel", code: "IL" },
    { name: "Italy", code: "IT" },
    { name: "Jamaica", code: "JM" },
    { name: "Japan", code: "JP" },
    { name: "Jordan", code: "JO" },
    { name: "Kazakhstan", code: "KZ" },
    { name: "Kenya", code: "KE" },
    { name: "Kiribati", code: "KI" },
    { name: "Kuwait", code: "KW" },
    { name: "Kyrgyzstan", code: "KG" },
    { name: "Laos", code: "LA" },
    { name: "Latvia", code: "LV" },
    { name: "Lebanon", code: "LB" },
    { name: "Lesotho", code: "LS" },
    { name: "Liberia", code: "LR" },
    { name: "Libya", code: "LY" },
    { name: "Liechtenstein", code: "LI" },
    { name: "Lithuania", code: "LT" },
    { name: "Luxembourg", code: "LU" },
    { name: "Madagascar", code: "MG" },
    { name: "Malawi", code: "MW" },
    { name: "Malaysia", code: "MY" },
    { name: "Maldives", code: "MV" },
    { name: "Mali", code: "ML" },
    { name: "Malta", code: "MT" },
    { name: "Marshall Islands", code: "MH" },
    { name: "Mauritania", code: "MR" },
    { name: "Mauritius", code: "MU" },
    { name: "Mexico", code: "MX" },
    { name: "Micronesia", code: "FM" },
    { name: "Moldova", code: "MD" },
    { name: "Monaco", code: "MC" },
    { name: "Mongolia", code: "MN" },
    { name: "Montenegro", code: "ME" },
    { name: "Morocco", code: "MA" },
    { name: "Mozambique", code: "MZ" },
    { name: "Myanmar", code: "MM" },
    { name: "Namibia", code: "NA" },
    { name: "Nauru", code: "NR" },
    { name: "Nepal", code: "NP" },
    { name: "Netherlands", code: "NL" },
    { name: "New Zealand", code: "NZ" },
    { name: "Nicaragua", code: "NI" },
    { name: "Niger", code: "NE" },
    { name: "Nigeria", code: "NG" },
    { name: "North Korea", code: "KP" },
    { name: "North Macedonia", code: "MK" },
    { name: "Norway", code: "NO" },
    { name: "Oman", code: "OM" },
    { name: "Pakistan", code: "PK" },
    { name: "Palau", code: "PW" },
    { name: "Palestine State", code: "PS" },
    { name: "Panama", code: "PA" },
    { name: "Papua New Guinea", code: "PG" },
    { name: "Paraguay", code: "PY" },
    { name: "Peru", code: "PE" },
    { name: "Philippines", code: "PH" },
    { name: "Poland", code: "PL" },
    { name: "Portugal", code: "PT" },
    { name: "Qatar", code: "QA" },
    { name: "Romania", code: "RO" },
    { name: "Russia", code: "RU" },
    { name: "Rwanda", code: "RW" },
    { name: "Saint Kitts and Nevis", code: "KN" },
    { name: "Saint Lucia", code: "LC" },
    { name: "Saint Vincent and the Grenadines", code: "VC" },
    { name: "Samoa", code: "WS" },
    { name: "San Marino", code: "SM" },
    { name: "Sao Tome and Principe", code: "ST" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Senegal", code: "SN" },
    { name: "Serbia", code: "RS" },
    { name: "Seychelles", code: "SC" },
    { name: "Sierra Leone", code: "SL" },
    { name: "Singapore", code: "SG" },
    { name: "Slovakia", code: "SK" },
    { name: "Slovenia", code: "SI" },
    { name: "Solomon Islands", code: "SB" },
    { name: "Somalia", code: "SO" },
    { name: "South Africa", code: "ZA" },
    { name: "South Korea", code: "KR" },
    { name: "South Sudan", code: "SS" },
    { name: "Spain", code: "ES" },
    { name: "Sri Lanka", code: "LK" },
    { name: "Sudan", code: "SD" },
    { name: "Suriname", code: "SR" },
    { name: "Sweden", code: "SE" },
    { name: "Switzerland", code: "CH" },
    { name: "Syria", code: "SY" },
    { name: "Tajikistan", code: "TJ" },
    { name: "Tanzania", code: "TZ" },
    { name: "Thailand", code: "TH" },
    { name: "Timor-Leste", code: "TL" },
    { name: "Togo", code: "TG" },
    { name: "Tonga", code: "TO" },
    { name: "Trinidad and Tobago", code: "TT" },
    { name: "Tunisia", code: "TN" },
    { name: "Turkey", code: "TR" },
    { name: "Turkmenistan", code: "TM" },
    { name: "Tuvalu", code: "TV" },
    { name: "Uganda", code: "UG" },
    { name: "Ukraine", code: "UA" },
    { name: "United Arab Emirates", code: "AE" },
    { name: "United Kingdom", code: "GB" },
    { name: "United States", code: "US" },
    { name: "Uruguay", code: "UY" },
    { name: "Uzbekistan", code: "UZ" },
    { name: "Vanuatu", code: "VU" },
    { name: "Vatican City", code: "VA" },
    { name: "Venezuela", code: "VE" },
    { name: "Vietnam", code: "VN" },
    { name: "Yemen", code: "YE" },
    { name: "Zambia", code: "ZM" },
    { name: "Zimbabwe", code: "ZW" },
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
      <label htmlFor="">Nationality</label>
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
            <ul className="absolute w-full border-2 border-gray-700 rounded-lg mt-2 shadow-lg z-10 bg-gray-700 max-h-[10rem] overflow-y-auto custom-scrollbar ">
              {countries.map((country, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-gray-800 cursor-pointer rounded-md "
                  onClick={() => {
                    setFormData({
                      ...formData,
                      nationality: country.name,
                      // countryCode: country.code,
                    });
                    setIsOpen(false);
                    setIsChanged(true);
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
  setIsChanged,
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
      <label htmlFor="">Identity</label>
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
                    setIsChanged(true);
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
