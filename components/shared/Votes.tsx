"use client";
import { createDownVote, createUpVote } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface VotesProps {
  type: string;
  questionId: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({ type, questionId, userId, upvotes, downvotes, hasUpVoted, hasDownVoted, hasSaved }: VotesProps) => {
  const handeSave = async () => {};
  const pathname = usePathname();
  const handleVote = async (action: "UpVote" | "DownVote") => {
    try {
      if (action === "UpVote") {
        await createUpVote({ userId, questionId, path: pathname, hasDownVoted, hasUpVoted });
      }
      if (action === "DownVote") {
        await createDownVote({ userId, questionId, path: pathname, hasDownVoted, hasUpVoted });
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
      <Image
        onClick={() => handeSave()}
        className="cursor-pointer"
        width={18}
        height={18}
        alt="upvote"
        src={hasSaved ? "/assets/icons/star-filled.svg" : "/assets/icons/star-red.svg"}
      />
    </div>
  );
};
export default Votes;
