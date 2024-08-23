import Data from "@/shared/Data";
import { Link } from "react-router-dom";

const VichelCategories = () => {
  return (
    <div className="py-8 container mx-auto max-w-6xl">
      <h2 className="text-2xl font-primaryBold  mb-10 text-center">
        Car Categories
      </h2>
      <div className="grid md:grid-cols-9 grid-cols-12 p-1 border-gray-400 my-3  gap-4 items-center justify-center">
        {Data.Category.map((item, index) => {
          return (
            <Link
              to={"/search/" + item.name}
              key={index}
              className="flex flex-col gap-2 p-1 items-center border-gray-300 border-2 rounded-md shadow-sm cursor-pointer
              hover:scale-105 transition-all duration-500"
            >
              <img src={item.icon} className="" width={30} height={30} />
              <h2 className="font-primaryBold text-sm">{item.name}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default VichelCategories;
