import { cn } from "@/lib/utils";
import Image from "next/image";

interface UserAvatarProps {
  imgUrl: string;
  classNames: string;
  alt?: string;
}

const UserAvatar = ({ imgUrl, classNames, alt }: UserAvatarProps) => {
  return (
    <div className={cn("relative", classNames)}>
      <Image src={imgUrl} alt={alt ? alt : "Фото пользователя"} fill className="object-cover rounded-full" />
    </div>
  );
};
export default UserAvatar;
