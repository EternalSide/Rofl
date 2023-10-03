import { SearchParamsProps } from "@/types";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({ searchParams, userId, clerkId }: Props) => {
  return <div>AnswerTab</div>;
};
export default AnswerTab;
