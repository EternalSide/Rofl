import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/Search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Пользователи / RuOverflow",
};
const UsersPage = async ({ searchParams }: SearchParamsProps) => {
  const { users, isNext } = await getAllUsers({
    searchQuery: searchParams.q,
    page: searchParams?.page ? +searchParams.page : 1,
    filter: searchParams.filter,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Все пользователи</h1>
      <div className="flex justify-between gap-5 mt-11 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/users"
          placeholder="Найти Пользователя"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          otherClasses=""
        />
        <Filter filters={UserFilters} otherClasses="min-h-[56px] sm:min-w-[170px]" />
      </div>
      <section className="flex gap-4 items-center flex-wrap justify-center mt-12">
        {users.length > 0 ? (
          users.map((user) => <UserCard key={JSON.stringify(user._id)} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>Пользователи не найдены.</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Станьте первым, кто начнет пользоваться #Overflow!
            </Link>
          </div>
        )}
      </section>

      <div className="mt-10">
        <Pagination isNext={isNext} pageNumber={searchParams?.page ? +searchParams.page : 1} />
      </div>
    </>
  );
};
export default UsersPage;
