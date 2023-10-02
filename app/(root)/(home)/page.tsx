import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import LocalSearchbar from "@/components/shared/Search/LocalSearchbar";
import { Button } from "@/components/ui/button";

import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import { getQuestions } from "@/lib/actions/question.action";

export default async function MainPage() {
  const results = await getQuestions({});

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Все Вопросы</h1>
        <Link className="flex justify-end max-sm:w-full" href="/ask-question">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">Новый Вопрос</Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Поиск по Вопросам"
          otherClasses="flex-1 w-full"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="max-md:flex hidden"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {results.questions.length > 0 ? (
          results.questions?.map((question) => (
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
            title="Упс! Вопросов нету.."
            description="Станьте первым, кто положит конец молчанию! 🚀Опубликуйте вопрос и начните обсуждение. Кто знает, может именно ваш вопрос поможет людям решить свою проблему.. Оставайтесь с нами! 💡"
            link="/ask-question"
            linkTitle="Новый Вопрос"
          />
        )}
      </div>
    </>
  );
}
