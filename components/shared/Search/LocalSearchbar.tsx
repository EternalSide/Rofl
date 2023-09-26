"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface CustomInputProps {
  route: string;
  iconPosition: "left" | "right";
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearchbar = ({ route, iconPosition, imgSrc, placeholder, otherClasses }: CustomInputProps) => {
  return (
    <div
      className={`background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image alt="Search Icon" width={24} height={24} src={imgSrc} className="cursor-pointer" />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none  outline-none"
      />
      {iconPosition === "right" && (
        <Image alt="Search Icon" width={24} height={24} src={imgSrc} className="cursor-pointer" />
      )}
    </div>
  );
};
export default LocalSearchbar;
