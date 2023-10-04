import { auth } from "@clerk/nextjs";

import { getUserByIdForProfile } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import { UserProps } from "../page";
import ProfileForm from "@/components/forms/ProfileForm";
import result from "postcss/lib/result";

const EditProfilePage = async ({ params, searchParams }: UserProps) => {
  const { userId } = auth();
  if (!userId) return null;
  const mongouser = await getUserByIdForProfile({ username: params.username });

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
