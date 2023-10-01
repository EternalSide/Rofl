import Link from "next/link";

type tagCard = {
  _id: string;
  name: string;
  link: string;
};

interface TagCardProps {
  tag: tagCard;
}

const TagCard = async ({ tag }: TagCardProps) => {
  //   const userTopTags = await getTopUserTags({ userId: user._id });
  return (
    <Link href={`/tags/${tag.name}`} className="shadow-light100_darknone  w-full max-xs:min-w-full xs:w-[260px]"></Link>
  );
};
export default TagCard;
