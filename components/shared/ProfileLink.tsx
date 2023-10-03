import Image from "next/image";
import Link from "next/link";

interface ProfileLinkProps {
  imgUrl: string;
  href?: string;
  title: string;
}
const ProfileLink = ({ imgUrl, title, href }: ProfileLinkProps) => {
  return (
    <div className="flex-center gap-1">
      <Image width={20} height={20} alt="icon" src={imgUrl} />
      {href ? (
        <Link href={href} target="_blank" className="text-blue-500 paragraph-medium">
          {title}
        </Link>
      ) : (
        <p className="text-dark400_light700 paragraph-medium mt-[2px]">{title}</p>
      )}
    </div>
  );
};
export default ProfileLink;
