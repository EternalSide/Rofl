"use client";
import { HomePageFilters } from "@/constants/filters";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HomeFilters = () => {
  // * Хардкод
  const ActiveFilter = "newest";
  return (
    <div className="mt-10 flex-wrap gap-3 md:flex hidden">
      {HomePageFilters.map((item) => (
        <Button
          className={cn(
            "body-medium rounded-md capitalize px-6 py-3",
            ActiveFilter === item.value
              ? "bg-primary-100 text-primary-500 dark:primary-gradient dark:text-white"
              : "bg-light-800 text-light-500 dark:bg-dark-300 dark:text-light-500",
          )}
          onClick={() => {}}
          key={item.value}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};
export default HomeFilters;
