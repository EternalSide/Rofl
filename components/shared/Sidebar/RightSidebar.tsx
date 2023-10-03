import Link from "next/link";
import Image from "next/image";
import RenderTag from "../RenderTag";
import { getPopularTags } from "@/lib/actions/tag.action";

const RightSidebar = async () => {
  // TODO: Выбрать 5 свежих вопросов у которых больше всего комментариев.
  const fakeData = [
    {
      text: "Уместно ли во время рецензирования указать на ошибку в другой статье?",
    },
    {
      text: "Как может существовать кондиционер?",
    },
    {
      text: "Interrogated every time crossing UK Border as citizen",
    },
    {
      text: "Low digit addition generator",
    },
    {
      text: "What is an example of 3 numbers that do not make up a vector?",
    },
  ];

  const popularTags = await getPopularTags();

  return (
    <section
      className="background-light900_dark200
        light-border custom-scrollbar sticky right-0 top-0 flex h-screen  
        w-[350px] flex-col overflow-y-auto border-l p-6 pb-12 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden"
    >
      <div>
        <h3 className="h3-bold text-dark200_light900">Обсуждаемое</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {fakeData.map((tag: any) => (
            <Link href={tag.text} key={tag.text} className="flex items-center justify-between gap-7">
              <p className="body-medium text-dark500_light700">{tag.text}</p>
              <Image
                src="/assets/icons/chevron-right.svg"
                className="invert-colors"
                width={20}
                height={20}
                alt={tag.text}
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Популярные Теги</h3>
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
