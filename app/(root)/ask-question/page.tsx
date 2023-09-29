import QuestionForm from "@/components/forms/QuestionForm";

const AskQuestionPage = async () => {
  return (
    <section>
      <div>
        <h1 className="h1-bold text-dark100_light900">Опубликовать Вопрос</h1>

        <div className="mt-9">
          <QuestionForm />
        </div>
      </div>
    </section>
  );
};
export default AskQuestionPage;
