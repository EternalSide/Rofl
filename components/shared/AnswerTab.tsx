import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import AnswerCard from "@/components/cards/AnswerCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({ userId, page: searchParams?.page ? +searchParams.page : 1 });

  return (
    <>
      {result.answers.map((answer) => {
        return (
          <AnswerCard
            key={answer._id}
            _id={answer._id.toString()}
            clerkId={clerkId}
            question={answer.question}
            author={answer.author}
            createdAt={answer.createdAt}
            upvotes={answer.upvotes.length}
          />
        );
      })}
      <div className="mt-10">
        <Pagination isNext={result.isNext} pageNumber={searchParams?.page ? +searchParams?.page : 1} />
      </div>
    </>
  );
};
export default AnswerTab;
