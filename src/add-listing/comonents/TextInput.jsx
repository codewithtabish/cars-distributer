import React from "react";
import { Input } from "@/components/ui/input";

const TextInput = ({ item, handleChnage }) => {
  return (
    <div className="my-2">
      <Input
        name={item?.name}
        type={item.fieldType}
        required={item.required}
        className="focus:outline-none focus:border-none hover:outline-none"
        onChange={(e) => handleChnage(item.name, e.target.value)}
      />
    </div>
  );
};

export default TextInput;
