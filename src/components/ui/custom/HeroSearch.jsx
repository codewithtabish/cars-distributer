import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Data from "@/shared/Data";
import { Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const HeroSearch = () => {
  const [car, setCar] = useState();
  const [make, setMake] = useState();
  const [price, setPrice] = useState();
  return (
    <div className="border-2 border-gray-400 max-w-[80%] mx-auto p-3 rounded-full my-4 shadow-md">
      <div className=" flex gap-4 items-center  justify-center ">
        {/* <Select className="outline-none border-none focus:border-none">
          <SelectTrigger className=" ">
            <SelectValue placeholder="Cars" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="New" key={index}>
              New
            </SelectItem>
            <SelectItem value="Used" key={index}>
              Used
            </SelectItem>
            <SelectItem value="Certified Pre-Owned" key={index}>
              Certified Pre-Owned
            </SelectItem>
          </SelectContent>
        </Select> */}
        <Select onValueChange={(value) => setCar(value)}>
          <SelectTrigger className=" outline-none border-none">
            <SelectValue placeholder="Cars" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Used">Used</SelectItem>
            <SelectItem value="Certified Pre-Owned">
              Certified Pre-Owned
            </SelectItem>
          </SelectContent>
        </Select>

        <SelectSeparator orientation="vertical" />
        <Select onValueChange={(value) => setMake(value)}>
          <SelectTrigger className=" outline-none border-none">
            <SelectValue placeholder="Car Makes" />
          </SelectTrigger>
          <SelectContent>
            {Data.CarMakes.map((item, index) => {
              return (
                <SelectItem value={item.name} key={index}>
                  {item.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <SelectSeparator orientation="vertical" />
        <Select onValueChange={(value) => setPrice(value)}>
          <SelectTrigger className=" outline-none border-none">
            <SelectValue placeholder="Pricing" />
          </SelectTrigger>
          <SelectContent className="outline-none border-none">
            {Data.Pricing.map((item, index) => {
              return (
                <SelectItem value={item.amount} key={index}>
                  {item.amount}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <SelectSeparator orientation="vertical" />
        <Link
          className="bg-primary p-2 flex justify-center cursor-pointer items-center rounded-full"
          to={"/search?cars=" + car + "&make=" + make + "&price=" + price}
        >
          <Search className="w-6 h-6 text-white" />
        </Link>
      </div>
    </div>
  );
};

export default HeroSearch;
