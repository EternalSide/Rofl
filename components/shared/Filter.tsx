"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formUrlQuery } from "@/lib/utils";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramFilter = searchParams.get("filter");

  const handleSorting = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={`relative max-sm:w-full ${containerClasses}`}>
      <Select onValueChange={handleSorting} defaultValue={paramFilter || undefined}>
        <SelectTrigger
          className={`${otherClasses} body-regular light-border !background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Сортировать По" />
          </div>
        </SelectTrigger>
        <SelectContent className="!background-light800_dark300 text-dark500_light700 small-regular border light-border">
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem
                className="focus:bg-light-700 dark:focus:bg-dark-400 transition cursor-pointer"
                key={item.value}
                value={item.value}
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
export default Filter;
