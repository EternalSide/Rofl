import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import UserAvatar from "@/components/shared/UserAvatar";

import { getQuestionById } from "@/lib/actions/question.action";

import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface QuestionPageProps {
  params: { questionId: string };
  searchParams: any;
}

const QuestionPage = async ({ params, searchParams }: QuestionPageProps) => {
  const question: any = await getQuestionById({ questionId: params.questionId });

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link className="flex items-center justify-start gap-1" href={`/profile/${question.author.username}`}>
            <UserAvatar imgUrl={question.author.picture} classNames="h-[22px] w-[22px]" />

            <p className="text-dark300_light700 paragraph-semibold"> {question.author.name}</p>
          </Link>
          <div className="flex justify-end">TODO: VOTING</div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 text-left w-full mt-3.5">{question.title}</h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={`asked ${getTimestamp(question.createdAt)}`}
          title="Asked"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(question.anwsers.length)}
          title="Ответов"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="Eye"
          value={formatAndDivideNumber(question.views)}
          title="Просмотров"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={question.content} />
    </>
  );
};
export default QuestionPage;
