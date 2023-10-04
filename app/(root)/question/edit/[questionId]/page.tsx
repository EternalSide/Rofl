import QuestionForm from "@/components/forms/QuestionForm";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const EditQuestionPage = async ({ params }: { params: { questionId: string } }) => {
  const { userId: clerkId } = auth();
  if (!clerkId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId: clerkId });
  const question = await getQuestionById({ questionId: params.questionId });

  const isOwnPost = question?.author.clerkId === clerkId;
  if (!isOwnPost) redirect("/sign-in");

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Редактировать Вопрос</h1>
      <div className="mt-9">
        <QuestionForm type="Edit" questionDetails={JSON.stringify(question)} mongoUserId={mongoUser._id.toString()} />
      </div>
    </>
  );
};
export default EditQuestionPage;
