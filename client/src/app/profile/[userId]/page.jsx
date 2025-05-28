import React from "react";
import Content from "./Content";

// interface Params {
//   params: {
//     userId: string;
//   };
// }

const getUser = async (userId) => {
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

const Page = async ({ params }) => {
  const { userId } = await params;

  const { user } = await getUser(userId);


  return (
    <div>
      <Content user={user} />
    </div>
  );
};

export default Page;
