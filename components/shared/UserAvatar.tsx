import { cn } from "@/lib/utils";
import Image from "next/image";

const UserAvatar = ({ imgUrl, classNames }: { imgUrl: string; classNames: string }) => {
  return (
    <div className={cn("relative", classNames)}>
      <Image src={imgUrl} alt="Фото пользователя" fill className="object-cover rounded-full" />
    </div>
  );
};
export default UserAvatar;
