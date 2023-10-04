"use client";

import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion, editUserQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  type: string;
  itemId: string;
  authorId: string;
}

const EditDelete = ({ type, itemId, authorId }: Props) => {
  const path = usePathname();
  const router = useRouter();
  const handleDelete = async (): Promise<void> => {
    if (type === "Question") {
      await deleteQuestion({ questionId: itemId, path });
    } else if (type === "Answer") {
      await deleteAnswer({ answerId: itemId, path });
    }
  };

  const handleEdit = async (): Promise<void> => {
    router.push(`/question/edit/${itemId}`);
    // await editUserQuestion({ itemId, authorId, path });
  };

  return (
    <div className="flex items-center gap-3 justify-end">
      {type === "Question" && (
        <Image
          onClick={handleEdit}
          alt="Edit Icon"
          src="/assets/icons/edit.svg"
          width={14}
          height={14}
          className="cursor-pointer"
        />
      )}
      <Image
        onClick={handleDelete}
        alt="Delete Icon"
        src="/assets/icons/trash.svg"
        width={15}
        height={15}
        className="cursor-pointer"
      />
    </div>
  );
};
export default EditDelete;
