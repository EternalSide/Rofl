import { AnswerFilters } from "@/constants/filters";
import Filter from "./Filter";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";

interface AllAnswersProps {
  questionId: string;
  authorId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
}

const AllAnswers = async ({ totalAnswers, questionId, authorId, page, filter }: AllAnswersProps) => {
  const result = await getAnswers({ questionId: questionId });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">Ответов: {totalAnswers}</h3>
        <Filter filters={AnswerFilters} />
      </div>
      <div>
        {result?.answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="flex items-center justify-between">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  className="flex flex-1 items-start gap-1 sm:items-center"
                  href={`/profile/${answer.author.username}`}
                >
                  <UserAvatar imgUrl={answer.author.picture} classNames="w-[18px] h-[18px] max-sm:mt-0.5" />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="mr-1 body-semibold text-dark300_light700">{answer.author.name}</p>
                    <p className="small-regular text-light400_light500 line-clamp-1 mt-0.5">
                      <span className="max-sm:hidden"> - </span>
                      {getTimestamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <Votes />
                </div>
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  );
};
export default AllAnswers;
