import UserCard from "@/components/cards/UserCard";
import { Input } from "@/components/ui/input";
import { getLastUsers } from "@/lib/actions/admin.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Админ-Панель / RuOverflow",
};

const AdminPage = async () => {
  const { userId } = auth();
  let user;
  if (userId) {
    user = await getUserById({ userId });
  } else {
    user = null;
  }
  let isAdmin = user?.username === "overflow";

  const lastUsers = await getLastUsers();

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Админ Панель</h1>
      <div
        className={`mt-11 background-light800_darkgradient  relative flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 `}
      >
        <Image alt="Search Icon" width={24} height={24} src="/assets/icons/search.svg" className="cursor-pointer" />
        <Input
          type="text"
          placeholder="Введите запрос.."
          // value={searchValue}
          // onChange={(e) => setSearchValue(e.target.value)}
          className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none  outline-none"
        />
      </div>
      <div className="mt-6">
        <div className="text-lg text-dark400_light900">
          {!user && "Вы не авторизованы. Вы можете производить запросы, но не совершать действия с системой."}
          {user && !isAdmin && (
            <>
              <p>
                Привет, {user?.name}. Твой статус - <span className="text-primary-500">пользователь</span>
              </p>
              <p>Вы можете производить запросы, но не совершать действия с системой.</p>
            </>
          )}
          {user && isAdmin && (
            <>
              <p>
                Привет, {user?.name}. Твой статус - <span className="text-primary-500">администратор</span>
              </p>
              <p>Вы можете производить запросы, и совершать действия с системой.</p>
            </>
          )}
        </div>
      </div>
      <div className="mt-12">
        <h1 className="h1-bold text-dark100_light900">Новые Аккаунты</h1>
        <section className="flex gap-4 items-center flex-wrap justify-center mt-12">
          {/* @ts-ignore */}
          {lastUsers?.length > 0 ? (
            /* @ts-ignore */
            lastUsers?.map((user) => <UserCard key={JSON.stringify(user._id)} user={user} />)
          ) : (
            <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
              <p>Пользователи не найдены.</p>
              <Link href="/sign-up" className="mt-4 font-bold text-accent-blue">
                Станьте первым, кто начнет пользоваться #Overflow!
              </Link>
            </div>
          )}
        </section>
      </div>
    </>
  );
};
export default AdminPage;
