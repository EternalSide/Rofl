"use client";
import { createDownVoteAnswer, createUpVoteAnswer } from "@/lib/actions/answer.action";
import { createDownVote, createUpVote, saveQuestion } from "@/lib/actions/question.action";
import { ToggleSaveQuestion } from "@/lib/actions/user.action";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface VotesProps {
  type: string;
  questionId?: string;
  answerId?: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  hasSaved?: boolean;
}

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
  const handeSave = async () => {
    await ToggleSaveQuestion({ userId, questionId: questionId!, path });
  };
  const path = usePathname();

  const router = useRouter();

  const handleVote = async (action: "UpVote" | "DownVote") => {
    // TODO: Auth modal + Modal Provider + zustand
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
          onClick={() => handeSave()}
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
