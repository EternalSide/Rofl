import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
}

const Metric = ({ imgUrl, alt, value, title, textStyles, href, isAuthor }: MetricProps) => {
  const metricContent = (
    <>
      <div className="relative h-4 w-4 -mt-[1.5px]">
        <Image className={cn("object-contain ", href ? "rounded-full  mr-1" : "")} fill alt={alt} src={imgUrl} />
      </div>

      <p className={cn("flex items-center gap-1", textStyles)}>
        <span className={cn("small-regular line-clamp-1", isAuthor && "max-sm:hidden ")}>{title}</span>
        {value}
      </p>
    </>
  );

  if (href) {
    return (
      <Link className="flex-center gap-1.5" href={href}>
        {metricContent}
      </Link>
    );
  }

  return <div className="flex flex-wrap items-center gap-1">{metricContent}</div>;
};
export default Metric;
