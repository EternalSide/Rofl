"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
interface CustomInputProps {
  route: string;
  iconPosition: "left" | "right";
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearchbar = ({ route, iconPosition, imgSrc, placeholder, otherClasses }: CustomInputProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [searchValue, setSearchValue] = useState(query || "");

  useEffect(() => {
    const debouncedValue = setTimeout(() => {
      if (searchValue) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: searchValue,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(debouncedValue);
  }, [searchValue, route, router, pathname, searchParams, query]);

  return (
    <div
      className={`background-light800_darkgradient  relative flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image alt="Search Icon" width={24} height={24} src={imgSrc} className="cursor-pointer" />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none  outline-none"
      />
      {iconPosition === "right" && (
        <Image alt="Search Icon" width={24} height={24} src={imgSrc} className="cursor-pointer" />
      )}
    </div>
  );
};
export default LocalSearchbar;
