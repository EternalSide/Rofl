import AnswerForm from "@/components/forms/AnswerForm";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import UserAvatar from "@/components/shared/UserAvatar";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Metadata } from "next";
import { ITag } from "@/database/models/tag.model";

interface QuestionPageProps {
  params: { questionId: string };
  searchParams: any;
}

export async function generateMetadata({ params }: QuestionPageProps): Promise<Metadata> {
  const question = await getQuestionById({ questionId: params.questionId });

  return {
    title: `${question.title} / RuOverFlow`,
  };
}

const QuestionPage = async ({ params, searchParams }: QuestionPageProps) => {
  const { userId } = auth();
  // if (!userId) return null;
  let user;
  const question = await getQuestionById({ questionId: params.questionId });

  if (userId) {
    user = await getUserById({ userId });
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link className="flex items-center justify-start gap-1" href={`/${question.author.username}`}>
            <UserAvatar imgUrl={question.author.picture} classNames="h-[22px] w-[22px]" />
            <p className="text-dark300_light700 paragraph-semibold"> {question.author.name}</p>
          </Link>

          <div className="flex justify-end">
            <Votes
              type="Question"
              questionId={question._id.toString()}
              userId={user?._id.toString() || undefined}
              upvotes={question.upvotes.length}
              downvotes={question.downvotes.length}
              hasUpVoted={question.upvotes.includes(user?._id)}
              hasDownVoted={question.downvotes.includes(user?._id)}
              hasSaved={user?.savedPosts.includes(question._id)}
            />
          </div>
        </div>

        <h2 className="h2-semibold text-dark200_light900 text-left w-full mt-3.5">{question.title}</h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={`опубликовано ${getTimestamp(question.createdAt)}`}
          title=""
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(question.anwsers.length)}
          title="Ответов:"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="Eye"
          value={formatAndDivideNumber(question.views)}
          title="Просмотров:"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={question.content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag: ITag) => (
          <RenderTag key={tag._id} _id={tag._id.toString()} showCount={false} name={tag.name} />
        ))}
      </div>

      <AllAnswers
        totalAnswers={question.anwsers.length}
        questionId={question._id.toString()}
        userId={user?._id.toString()}
        filter={searchParams?.filter}
        page={searchParams?.page}
      />

      <AnswerForm authorId={user?._id.toString()} questionId={params.questionId} question={question.content} />
    </>
  );
};
export default QuestionPage;
