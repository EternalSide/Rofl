"use client";
import { formUrlQuery } from "@/lib/utils";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  isNext: boolean;
  pageNumber: number;
}

const Pagination = ({ isNext, pageNumber }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleNavigation = (direction: string) => {
    const nextPageNumber = direction === "Prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  if (!isNext && pageNumber === 1) return null;
  return (
    <div className="flex w-full justify-center items-center gap-2">
      <Button
        className="light-border-2 border btn flex min-h-[36px] items-center justify-center gap-2"
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("Prev")}
      >
        <p className="body-medium text-dark200_light800">Пред</p>
      </Button>
      <div className="bg-primary-500 flex justify-center items-center rounded-md px-3.5 py-2">
        <p className="body-semibold text-light-900">{pageNumber}</p>
      </div>
      <Button
        className="light-border-2 border btn flex min-h-[36px] items-center justify-center gap-2"
        disabled={!isNext}
        onClick={() => handleNavigation("Next")}
      >
        <p className="body-medium text-dark200_light800">След</p>
      </Button>
    </div>
  );
};
export default Pagination;
