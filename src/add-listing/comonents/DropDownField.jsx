import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DropDownField = ({ item, handleChnage }) => {
  return (
    <div className="w-full my-2">
      <Select
        className="w-full"
        onValueChange={(value) => handleChnage(item.name, value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={item.label} />
        </SelectTrigger>
        <SelectContent>
          {item.options.map((item, index) => {
            return <SelectItem value={item}>{item}</SelectItem>;
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropDownField;
