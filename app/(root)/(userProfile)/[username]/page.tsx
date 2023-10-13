import UserAvatar from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import { getUserByUsername } from "@/lib/actions/user.action";
import { SignedIn, auth } from "@clerk/nextjs";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";
import ProfileLink from "@/components/shared/ProfileLink";
import Stats from "@/components/shared/Stats";
import { BadgeCheck } from "lucide-react";
import QuestionTab from "@/components/shared/QuestionTab";
import AnswerTab from "@/components/shared/AnswerTab";
import { ParamsProps } from "@/types";
import { Metadata } from "next";

export interface UserProps extends ParamsProps {
  searchParams: any;
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const data = await getUserByUsername({ username: params.username });

  if (!data)
    return {
      title: `Пользователь не найден / RuOverFlow`,
    };

  return {
    title: `${data?.user.name} (@${data?.user.username}) / RuOverFlow`,
  };
}

const UserProfile = async ({ params, searchParams }: UserProps) => {
  const { userId: clerkId } = auth();
  const data = await getUserByUsername({ username: params.username });

  const isOwnProfile = clerkId && clerkId === data?.user.clerkId;
  const isAdmin = data?.user.username === "overflow";

  if (!data?.user) {
    return <h1 className="h1-bold text-dark100_light900 text-center">Учетной записи не существует.</h1>;
  }

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <UserAvatar alt={`Фото ${data.user.name}`} imgUrl={data.user.picture} classNames="w-[140px] h-[140px]" />
          <div className="mt-3">
            <div className="flex items-center gap-1">
              <h2 className="h2-bold text-dark100_light900">{data.user.name}</h2>
              {isAdmin && <BadgeCheck color="#ff7000" className="primary-text-gradient h-5 w-5" />}
            </div>
            <p className="parapgraph-regular text-dark200_light800">@{data.user.username}</p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {data.user.portfolioWebsite && (
                <ProfileLink imgUrl="/assets/icons/link.svg" title="Вебсайт" href={data.user.portfolioWebsite} />
              )}
              {data.user.location && <ProfileLink imgUrl="/assets/icons/location.svg" title={data.user.location} />}
              {<ProfileLink imgUrl="/assets/icons/calendar.svg" title={formatDate(data.user.joinedAt.toString())} />}
            </div>

            {data.user.bio && <p className="parapgraph-regular text-dark400_light800 mt-8">{data.user.bio}</p>}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {isOwnProfile && (
              <Link href={`/${data.user.username}/edit`}>
                <Button className="btn-secondary paragraph-medium text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Редактировать
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <Stats
        reputation={data.reputation}
        totalQuestions={data.totalQuestions}
        totalAnswers={data.totalAnswers}
        badges={data.badgeCounts}
      />

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Вопросы
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Ответы
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts" className="flex w-full flex-col gap-3">
            <QuestionTab searchParams={searchParams} userId={data.user._id.toString()} clerkId={clerkId} />
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-3 !mt-[0px]">
            <AnswerTab searchParams={searchParams} userId={data.user._id.toString()} clerkId={clerkId} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
export default UserProfile;
