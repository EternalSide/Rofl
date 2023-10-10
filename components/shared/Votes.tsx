"use client";
import { createDownVoteAnswer, createUpVoteAnswer } from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import { createDownVote, createUpVote } from "@/lib/actions/question.action";
import { ToggleSaveQuestion } from "@/lib/actions/user.action";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "../ui/use-toast";

interface VotesProps {
  type: string;
  questionId?: string;
  answerId?: string;
  userId: string | undefined;
  upvotes: number;
  downvotes: number;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  hasSaved?: boolean;
}

type ActionVoteType = "UpVote" | "DownVote";

const Votes = ({
  type,
  questionId,
  userId,
  answerId,
  upvotes,
  downvotes,
  hasUpVoted,
  hasDownVoted,
  hasSaved,
}: VotesProps) => {
  const path = usePathname();

  useEffect(() => {
    viewQuestion({ questionId: questionId!, userId: userId ? userId : undefined });
  }, [questionId, answerId, path, userId]);

  const handleSave = async (): Promise<void> => {
    if (!userId) return;

    const savedAction = await ToggleSaveQuestion({ userId, questionId: questionId!, path });

    toast({
      title: savedAction === "add" ? "Вопрос добавлен в Избранное ✅" : "Вопрос удален из Избранного ✅",
      className: "bg-black text-white border-neutral-900",
      duration: 2000,
    });
    return;
  };

  const handleVote = async (action: ActionVoteType): Promise<void> => {
    if (!userId) return;

    try {
      if (action === "UpVote") {
        if (type === "Question") {
          await createUpVote({ userId, questionId: questionId!, path, hasDownVoted, hasUpVoted });
        } else if (type === "Answer") {
          await createUpVoteAnswer({ userId, answerId: answerId!, path, hasDownVoted, hasUpVoted });
        }

        // TODO: toaster
        return;
      }

      if (action === "DownVote") {
        if (type === "Question") {
          await createDownVote({ userId, questionId: questionId!, path, hasDownVoted, hasUpVoted });
        } else if (type === "Answer") {
          await createDownVoteAnswer({ userId, answerId: answerId!, path, hasDownVoted, hasUpVoted });
        }
        // TODO: toaster
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            onClick={() => handleVote("UpVote")}
            className="cursor-pointer"
            width={18}
            height={18}
            alt="upvote"
            src={hasUpVoted ? "/assets/icons/upvoted.svg" : "/assets/icons/upvote.svg"}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] p-1 rounded-sm">
            <p className="subtle-medium text-dark400_light900">{upvotes}</p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <Image
            onClick={() => handleVote("DownVote")}
            className="cursor-pointer"
            width={18}
            height={18}
            alt="upvote"
            src={hasDownVoted ? "/assets/icons/downvoted.svg" : "/assets/icons/downvote.svg"}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] p-1 rounded-sm">
            <p className="subtle-medium text-dark400_light900">{downvotes !== 0 ? `-${downvotes}` : 0}</p>
          </div>
        </div>
      </div>

      {type === "Question" && (
        <Image
          onClick={handleSave}
          className="cursor-pointer"
          width={18}
          height={18}
          alt="upvote"
          src={hasSaved ? "/assets/icons/star-filled.svg" : "/assets/icons/star-red.svg"}
        />
      )}
    </div>
  );
};
export default Votes;
