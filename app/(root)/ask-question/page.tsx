import QuestionForm from "@/components/forms/QuestionForm";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AskQuestionPage = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  return (
    <section>
      <div>
        <h1 className="h1-bold text-dark100_light900">Опубликовать Вопрос</h1>

        <div className="mt-9">
          <QuestionForm mongoUserId={JSON.stringify(mongoUser._id)} />
        </div>
      </div>
    </section>
  );
};
export default AskQuestionPage;
