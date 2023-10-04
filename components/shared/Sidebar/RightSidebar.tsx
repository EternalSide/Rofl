import Link from "next/link";
import Image from "next/image";
import RenderTag from "../RenderTag";
import { getPopularTags } from "@/lib/actions/tag.action";
import { getPopularQuestions } from "@/lib/actions/question.action";

const RightSidebar = async () => {
  const popularTags = await getPopularTags();
  const popularQuestions = await getPopularQuestions();

  return (
    <section
      className="background-light900_dark200
        light-border custom-scrollbar sticky right-0 top-0 flex h-screen  
        w-[350px] flex-col overflow-y-auto border-l p-6 pb-12 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden"
    >
      <div>
        <h3 className="h3-bold text-dark200_light900">Обсуждаемое 🔥</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {popularQuestions.map((question: any) => (
            <Link
              href={`/question/${question._id.toString()}`}
              key={question._id}
              className="flex items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{question.title}</p>
              <Image
                src="/assets/icons/chevron-right.svg"
                className="invert-colors"
                width={20}
                height={20}
                alt={question.title}
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Популярные теги 💬</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag.name}
              _id={tag._id.toString()}
              name={tag.name}
              totalQuestions={tag.questions.length}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default RightSidebar;
