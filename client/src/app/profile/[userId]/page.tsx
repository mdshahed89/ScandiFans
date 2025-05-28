import React from "react";
import Content from "./Content";

interface Params {
  params: {
    userId: string;
  };
}

const getUser = async (userId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me/${userId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch user");
    return null;
  }

  return res.json();
};

const Page = async ({ params }: Params) => {
  const { userId } = await params;

  const { user } = await getUser(userId);

  // console.log(user)

  return (
    <div>
      <Content user={user} />
    </div>
  );
};

export default Page;
