import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }: Props) => {
  return (
    <div className={`relative max-sm:w-full ${containerClasses}`}>
      <Select>
        <SelectTrigger
          className={`${otherClasses} body-regular light-border !background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Фильтр" />
          </div>
        </SelectTrigger>
        <SelectContent className="!background-light800_dark300 text-dark500_light700 border light-border">
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem className="hover:opacity-90 transition cursor-pointer" key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
export default Filter;
