import React from "react";
// import Content from "./Content";

// const getUser = async (userId) => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userId}`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     console.error("Failed to fetch user");
//     return null;
//   }

//   return res.json();
// };

const Page = async ({ params }) => {
  // const { userId } = await params;

  // const { user } = await getUser(userId);

  // console.log(user);
  


  return (
    <div>
      page view
      {/* <Content user={user} /> */}
    </div>
  );
};

export default Page;
