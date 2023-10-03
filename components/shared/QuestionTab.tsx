import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import QuestionCard from "@/components/cards/QuestionCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserQuestions({ userId });

  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          key={question._id}
          clerkId={clerkId}
          _id={question._id}
          title={question.title}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          anwsers={question.anwsers}
          createdAt={question.createdAt}
          tags={question.tags}
        />
      ))}
    </>
  );
};
export default QuestionTab;
