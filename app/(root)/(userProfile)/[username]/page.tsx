import UserAvatar from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import { getUserByIdForProfile } from "@/lib/actions/user.action";
import { SignedIn, auth } from "@clerk/nextjs";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";
import ProfileLink from "@/components/shared/ProfileLink";
import Stats from "@/components/shared/Stats";
import { BadgeCheck } from "lucide-react";
import QuestionTab from "@/components/shared/QuestionTab";
import AnswerTab from "@/components/shared/AnswerTab";

const OtherUserProfile = async ({ params }: { params: { username: string } }) => {
  const { userId } = auth();
  const { user, totalQuestions, totalAnswers }: any = await getUserByIdForProfile({ username: params.username });
  const isOwnProfile: boolean = userId === user.clerkId;

  const isAdmin = user.username === "overflow";

  if (!user) {
    return (
      <div>
        <h1 className="h1-bold text-dark100_light900">Учетной записи не существует.</h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <UserAvatar alt={`Фото ${user.name}`} imgUrl={user.picture} classNames="w-[140px] h-[140px]" />
          <div className="mt-3">
            <div className="flex items-center gap-1">
              <h2 className="h2-bold text-dark100_light900">{user.name}</h2>
              {isAdmin && <BadgeCheck color="#ff7000" className="primary-text-gradient h-5 w-5" />}
            </div>
            <p className="parapgraph-regular text-dark200_light800">@{user.username}</p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {user.portfolioWebsite && (
                <ProfileLink imgUrl="/assets/icons/link.svg" title="Портфолио" href={user.portfolioWebsite} />
              )}
              {user.location && <ProfileLink imgUrl="/assets/icons/location.svg" title={user.location} />}
              {<ProfileLink imgUrl="/assets/icons/calendar.svg" title={formatDate(user.joinedAt.toString())} />}
            </div>

            {user.bio && <p className="parapgraph-regular text-dark400_light800 mt-8">{user.bio}</p>}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {isOwnProfile && (
              <Link href="/profile/edit">
                <Button className="btn-secondary paragraph-medium text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Редактировать
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <Stats totalQuestions={totalQuestions} totalAnswers={totalAnswers} />

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
          <TabsContent value="top-posts">
            <QuestionTab />
          </TabsContent>
          <TabsContent value="answers">
            <AnswerTab />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
export default OtherUserProfile;
