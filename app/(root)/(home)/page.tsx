import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import LocalSearchbar from "@/components/shared/Search/LocalSearchbar";
import { Button } from "@/components/ui/button";

import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title:
      "The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this",
    author: {
      _id: "1",
      name: "Jack White",
      picture: "url_to_picture",
    },
    upvotes: 10,
    views: 100,
    anwsers: [],
    createdAt: new Date("2023-08-01T12:00:00.000Z"),
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "sql" },
    ],
  },
  {
    _id: "2",
    title: "How to center a div?",
    author: {
      _id: "2",
      name: "Jack White",
      picture: "url_to_picture",
    },
    upvotes: 10,
    views: 100,
    anwsers: [],
    createdAt: new Date("2022-09-01T12:00:00.000Z"),
    tags: [
      { _id: "3", name: "css" },
      { _id: "4", name: "html" },
    ],
  },
];

export default function MainPage() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Все Вопросы</h1>
        <Link className="flex justify-end max-sm:w-full" href="/questions/ask">
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
        {questions.length > 0 ? (
          questions?.map((question) => (
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
            title="There’s no question to show"
            description=" Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next
          big thing others learn from. Get involved! 💡"
            link="/asq-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
