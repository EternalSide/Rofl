"use client";
import { HomePageFilters } from "@/constants/filters";
import { Button } from "@/components/ui/button";
import { cn, formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const [active, setActive] = useState("");
  const router = useRouter();

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="mt-10 flex-wrap gap-3 md:flex hidden">
      {HomePageFilters.map((item) => (
        <Button
          className={cn(
            "body-medium rounded-md capitalize px-6 py-3",
            active === item.value
              ? "bg-primary-100 text-primary-500 dark:primary-gradient dark:text-white"
              : "bg-light-800 text-light-500 dark:bg-dark-300 dark:text-light-500",
          )}
          onClick={() => handleTypeClick(item.value)}
          key={item.value}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};
export default HomeFilters;
