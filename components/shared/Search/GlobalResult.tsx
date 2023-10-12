"use client";

import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GlobalFilters from "./GlobalFilters";
import { globalSearch } from "@/lib/actions/general.action";
const GlobalResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const [result, setResult] = useState([]);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);
      try {
        const res = await globalSearch({
          query: global,
          type,
        });
        setResult(JSON.parse(res));
      } catch (e) {
        console.log(e);
        throw e;
      } finally {
        setIsLoading(false);
      }
    };
    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    console.log(type, id);
    switch (type) {
      case "question":
        return `/question/${id}`;

      case "answer":
        return `/question/${id}`;

      case "user":
        return `/${id}`;

      case "tag":
        return `/tags/${id}`;

      default:
        return "/";
    }
  };

  return (
    <div className="absolute top-full z-10 mt-3 w-full bg-light-800 py-5 shadow-sm dark:bg-dark-400 rounded-xl">
      <GlobalFilters />
      {/* <p className="paragraph-semibold px-5 text-dark400_light900">Фильтры</p> */}
      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50" />
      <div className="space-y-5">
        <p className="paragraph-semibold px-5 text-dark400_light900">Результаты</p>
        {isLoading ? (
          <div className="flex-center flex-col px-5">
            <ReloadIcon className="my-2 h-10 w-10 text-primary-500 animate-spin" />
            <p className="text-dark200_light800 body-regular">Формирую Результаты</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {result?.length > 0 ? (
              result.map((item: any, index: number) => (
                <Link
                  className="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:hover:bg-dark-500/50"
                  key={item.type + item.id + index}
                  href={renderLink(item.type, item.id)}
                >
                  <Image
                    className="invert-colors mt-1 object-contain"
                    src="/assets/icons/tag.svg"
                    alt="tags"
                    width={18}
                    height={18}
                  />
                  <div className="flex flex-col">
                    <p className="body-medium text-dark200_light800 line-clamp-1">{item.title}</p>
                    <p className="text-light400_light500 mt-1 font-bold small-medium capitalize">{item.type}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-dark200_light900 px-5 py-2.5 body-regular">Ничего не найдено...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default GlobalResult;
