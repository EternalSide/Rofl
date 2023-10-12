import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/Search/LocalSearchbar";
import { getTagQuestion } from "@/lib/actions/tag.action";
import { TagPageProps } from "@/types";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const tagName = params.tagName;

  return {
    title: `Тег: ${tagName[0].toUpperCase() + tagName.slice(1)} / RuOverFlow`,
  };
}

const TagPage = async ({ params, searchParams }: TagPageProps) => {
  const tagName = params.tagName;
  const { tagQuestions, isNext } = await getTagQuestion({
    tagName,
    page: searchParams?.page ? +searchParams.page : 1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 first-letter:uppercase">{tagName}</h1>
      <div className="mt-11 w-full">
        <LocalSearchbar
          route={`/tags/${tagName}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder={`Найти вопрос по тегу "${tagName}"`}
          otherClasses="flex-1 w-full"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {tagQuestions?.length > 0 ? (
          tagQuestions?.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              anwsers={question.anwsers}
              createdAt={question.createdAt}
              tags={question.tags}
            />
          ))
        ) : (
          <NoResult
            title="Упс! У вас нету сохраненных вопросов.."
            description=""
            link="/ask-question"
            linkTitle="Новый Вопрос"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination isNext={isNext} pageNumber={searchParams?.page ? +searchParams?.page : 1} />
      </div>
    </>
  );
};
export default TagPage;
