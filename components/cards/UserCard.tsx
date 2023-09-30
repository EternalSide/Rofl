import Image from "next/image";
import RenderTag from "@/components/shared/RenderTag";
import { IUser } from "@/database/models/user.model";
import Link from "next/link";
import getTopUserTags from "@/lib/actions/tag.action";
import { Badge } from "@/components/ui/badge";

interface UserCardProps {
  user: Partial<IUser>;
  tags?: any;
}

const UserCard = async ({ user }: UserCardProps) => {
  const userTopTags = await getTopUserTags({ userId: user._id });
  return (
    <Link href={`/profile/${user.clerkId}`} className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]">
      <div className="background-light900_dark200 light-border w-full flex flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture!}
          alt="Фото пользователя"
          width={100}
          height={100}
          className="object-cover rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="text-dark200_light900 h3-bold line-clamp-1">{user.name}</h3>
          <p className="body-regular text-dark500_light500 mt-2">@{user.username}</p>
        </div>

        <div className="flex items-center gap-2 mt-5">
          {userTopTags.length > 0 ? (
            userTopTags.map((t) => <RenderTag key={t._id} _id={t._id} name={t.name} />)
          ) : (
            <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
              0 Тегов
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
};
export default UserCard;
