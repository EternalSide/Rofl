"use client";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const FilterQuestions = () => {
  const [active, setActive] = useState("Newest");
  const fakeData = [
    {
      name: "Newest",
    },
    {
      name: "Recommended Questions",
    },
    {
      name: "Frequent",
    },
    {
      name: "Unanswered",
    },
  ];
  return (
    <div className="mt-7">
      {fakeData.map((item, index) => {
        const isActive = active === item.name;
        return (
          <Badge
            key={index}
            onClick={() => {
              setActive(item.name);
            }}
            className={`body-medium background-light800_dark300 text-light400_light500 mr-3 cursor-pointer rounded-lg border-none px-6 py-3 ${
              isActive && "primary-text-gradient"
            }`}
          >
            {item.name}
          </Badge>
        );
      })}
      <Select>
        <SelectTrigger className="background-light800_dark300 text-light400_light500 w-[180px] focus:border-none data-[state=closed]:border-none data-[state=open]:border-none data-[state=selected]:border-none">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent className="background-light800_dark300 text-light400_light500 border-none">
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
export default FilterQuestions;
