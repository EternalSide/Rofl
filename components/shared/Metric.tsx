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
      <Image
        className={cn("object-contain", href ? "rounded-full" : "")}
        width={16}
        height={16}
        alt={alt}
        src={imgUrl}
      />
      <p className={cn("flex items-center gap-1", textStyles)}>
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

  return <div className="flex-center flex-wrap gap-1">{metricContent}</div>;
};
export default Metric;
