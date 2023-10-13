import Link from "next/link";
import RenderTag from "@/components/shared/RenderTag";
import Metric from "@/components/shared/Metric";
import EditDelete from "@/components/shared/EditDelete";

import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";

interface Props {
  _id: string;
  clerkId?: string | null;
  title: string;

  tags: {
    _id: string;
    name: string;
  }[];

  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
    username: string;
  };

  upvotes: string[];
  views: number;
  anwsers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({ _id, clerkId, title, author, upvotes, views, anwsers, createdAt, tags }: Props) => {
  const convertedDate = getTimestamp(createdAt);
  const showActionButtons = clerkId && clerkId === author.clerkId;
  return (
    <div className="card-wrapper w-full rounded-[10px] p-9  sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div className="flex items-center justify-between w-full">
          <div>
            <span className="line-clamp-1 flex sm:hidden text-dark400_light700 subtle-regular">{convertedDate}</span>
            <Link href={`/question/${_id}`}>
              <h3 className="text-dark200_light900 sm:h3-semibold base-semibold line-clamp-1 flex-1">{title}</h3>
            </Link>
          </div>
          {/* Edit/Delete componente */}
          <SignedIn>
            {showActionButtons && (
              <EditDelete type="Question" itemId={_id.toString()} authorId={author._id.toString()} />
            )}
          </SignedIn>
        </div>
      </div>
      {/* Теги */}
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={JSON.stringify(tag._id)} name={tag.name} />
        ))}
      </div>
      {/* Низ Карточки*/}
      <div className="flex-between mt-8 w-full flex-wrap gap-3 ">
        {/* TODO: Разделить на 2 блока, левый и правый + сделать max-lg:flex-col  */}
        <Metric
          imgUrl={author.picture}
          alt="Author"
          value={author.name}
          title={` - ${convertedDate}`}
          href={`/${author.username}`}
          isAuthor
          textStyles="body-medium text-dark400_light700 flex-row-reverse"
        />
        <div className="flex items-center gap-4 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatAndDivideNumber(upvotes.length)}
            title="Нравится:"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatAndDivideNumber(anwsers.length)}
            title="Ответов:"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="Eye"
            value={formatAndDivideNumber(views)}
            title="Просмотров:"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};
export default QuestionCard;
