import Content from "./Content";

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

  return res.json(); // Expecting { user: ... }
};

export default async function Page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const data = await getUser(userId);

  if (!data?.user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <Content user={data.user} />
    </div>
  );
}
