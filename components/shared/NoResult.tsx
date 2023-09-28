import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}

const NoResult = ({ title, description, link, linkTitle }: Props) => {
  return (
    <div className="mt-10 flex flex-col w-full justify-center items-center">
      <Image
        className="block object-contain dark:hidden"
        src="/assets/images/light-illustration.png"
        alt="No results Illustration"
        width={270}
        height={200}
      />
      <Image
        className="hidden object-contain dark:flex"
        src="/assets/images/dark-illustration.png"
        alt="No results Illustration"
        width={270}
        height={200}
      />
      <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">{description}</p>
      <Link href={link}>
        <Button className="paragraph-medium mt-5 min-h">{linkTitle}</Button>
      </Link>
    </div>
  );
};
export default NoResult;
