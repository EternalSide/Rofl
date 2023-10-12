import { auth } from "@clerk/nextjs";

import { getUserByUsername } from "@/lib/actions/user.action";
import { UserProps } from "../page";
import ProfileForm from "@/components/forms/ProfileForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Редактировать Профиль / RuOverflow",
};

const EditProfilePage = async ({ params, searchParams }: UserProps) => {
  const { userId } = auth();
  if (!userId) return null;
  const mongouser = await getUserByUsername({ username: params.username });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Редактировать Профиль</h1>

      <div className="mt-9">
        <ProfileForm clerkId={userId} user={JSON.stringify(mongouser)} />
      </div>
    </>
  );
};
export default EditProfilePage;
