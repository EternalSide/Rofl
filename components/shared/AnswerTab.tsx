import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import AnswerCard from "@/components/cards/AnswerCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({ userId });

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
    </>
  );
};
export default AnswerTab;
