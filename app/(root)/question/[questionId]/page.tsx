import { IQuestion } from "@/database/models/question.model";
import { getQuestionById } from "@/lib/actions/question.action";

interface QuestionPageProps {
  params: { questionId: string };
  searchParams: any;
}

const QuestionPage = async ({ params, searchParams }: QuestionPageProps) => {
  // TODO: Create a server action to get a question from the database by providing its id.
  const question: IQuestion = await getQuestionById(params);
  console.log(question);
  // TODO:
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">{question.title}</h1>
    </div>
  );
};
export default QuestionPage;
