import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/Search/LocalSearchbar";
import { QuestionFilters } from "@/constants/filters";
import { getSavedPosts } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SavedPostPage = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const { questions } = await getSavedPosts({ clerkId: userId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Избранное</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Поиск по Вопросам"
          otherClasses="flex-1 w-full"
        />
        <Filter filters={QuestionFilters} otherClasses="min-h-[56px] sm:min-w-[170px]" />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions?.length > 0 ? (
          questions?.map((question: any) => (
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
          <NoResult title="Ничего не найдено.." description="" link="/" linkTitle="На Главную" />
        )}
      </div>
    </>
  );
};
export default SavedPostPage;
