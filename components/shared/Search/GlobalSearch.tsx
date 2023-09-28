import Image from "next/image";
import { Input } from "@/components/ui/input";
const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image alt="Search" width={24} height={24} src="/assets/icons/search.svg" className="cursor-pointer" />
        <Input
          type="text"
          placeholder="Глобальный Поиск"
          className="paragraph-regular no-focus placeholder bg-transparent border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
};
export default GlobalSearch;
