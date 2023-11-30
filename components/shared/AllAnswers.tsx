import { AnswerFilters } from "@/constants/filters";
import Filter from "./Filter";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
import Pagination from "./Pagination";

interface AllAnswersProps {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({ totalAnswers, questionId, userId, page, filter }: AllAnswersProps) => {
  const result = await getAnswers({ questionId: questionId, page: page ? +page : 1, sortBy: filter });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-1.5 max-sm:items-start">
        <h3 className="primary-text-gradient">Ответов: {totalAnswers}</h3>
        {totalAnswers > 0 && <Filter filters={AnswerFilters} />}
      </div>
      <div>
        {result?.answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 w-full">
              <Link className="flex items-start gap-1 sm:items-center" href={`/${answer.author.username}`}>
                <UserAvatar imgUrl={answer.author.picture} classNames="w-[18px] h-[18px] max-sm:mt-0.5" />
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="mr-1 body-semibold text-dark300_light700">{answer.author.name}</p>
                  <p className="small-regular text-light400_light500 line-clamp-1 sm:pt-[1px]">
                    <span className="max-sm:hidden"> - </span>
                    {getTimestamp(answer.createdAt)}
                  </p>
                </div>
              </Link>

              <div className="flex justify-end">
                <Votes
                  type="Answer"
                  answerId={answer._id.toString()}
                  userId={userId}
                  upvotes={answer.upvotes.length}
                  downvotes={answer.downvotes.length}
                  hasUpVoted={answer.upvotes.includes(userId)}
                  hasDownVoted={answer.downvotes.includes(userId)}
                />
              </div>
            </div>

            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
      <div className="mt-10 w-full">
        <Pagination isNext={result?.isNext!} pageNumber={page ? +page : 1} />
      </div>
    </div>
  );
};
export default AllAnswers;
