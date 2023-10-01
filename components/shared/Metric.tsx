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
      <div className="relative h-4 w-4">
        <Image className={cn("object-contain", href ? "rounded-full  mr-1" : "")} fill alt={alt} src={imgUrl} />
      </div>
      <p className={cn("flex items-end gap-1 pt-[4px]", textStyles)}>
        {value}
        <span className={cn("small-regular line-clamp-1", isAuthor && "max-sm:hidden")}>{title}</span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link className="flex-center gap-1" href={href}>
        {metricContent}
      </Link>
    );
  }

  return <div className="flex items-end flex-wrap gap-1">{metricContent}</div>;
};
export default Metric;
