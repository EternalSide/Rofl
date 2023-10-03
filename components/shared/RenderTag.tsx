"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface Props {
  _id: string;
  name: string;
  totalQuestions?: any;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  // ! Компонент вызывает hydration error;
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  return (
    <Link className="flex justify-between gap-2" href={`/tags/${name}`}>
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>
      {showCount && <p className="small-medium text-dark500_light700">{totalQuestions}</p>}
    </Link>
  );
};
export default RenderTag;
