import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/Search/LocalSearchbar";
import { TagFilters } from "@/constants/filters";
import { ITag } from "@/database/models/tag.model";
import { getAllTags } from "@/lib/actions/tag.action";
import { SearchParamsProps } from "@/types";

import Link from "next/link";

const TagsPage = async ({ searchParams }: SearchParamsProps) => {
  const { tags } = await getAllTags({ searchQuery: searchParams.q, filter: searchParams.filter });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Теги</h1>
      <div className="flex justify-between gap-5 mt-11 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/tags"
          placeholder="Найти Тег"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          otherClasses=""
        />
        <Filter filters={TagFilters} otherClasses="min-h-[56px] sm:min-w-[170px]" />
      </div>
      <section className="flex gap-4 items-center flex-wrap justify-center mt-12">
        {tags.length > 0 ? (
          tags.map((tag: ITag) => (
            <Link className="shadow-light100_darknone" key={tag._id} href={`/tags/${tag.name}`}>
              <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                  <p className="paragraph-semibold text-dark300_light900">{tag.name}</p>
                </div>

                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">{tag.questions.length}+</span> Вопросов
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResult
            title="Упс! Теги не найдены.."
            description="Кажется что-то пошло не так."
            link="/"
            linkTitle="На Главную"
          />
        )}
      </section>
    </>
  );
};
export default TagsPage;
