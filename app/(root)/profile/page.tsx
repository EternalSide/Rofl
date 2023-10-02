import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const UserProfilePage = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const currentUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Профиль {currentUser.name}</h1>
    </div>
  );
};
export default UserProfilePage;
