import QuestionForm from "@/components/forms/QuestionForm";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Новый Вопрос / RuOverflow",
};
const AskQuestionPage = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Опубликовать Вопрос</h1>

      <div className="mt-9">
        <QuestionForm mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </>
  );
};
export default AskQuestionPage;
