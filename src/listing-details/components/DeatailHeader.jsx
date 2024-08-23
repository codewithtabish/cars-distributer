import { Check, SpeechIcon } from "lucide-react";
import React from "react";
import { HiCalendarDays } from "react-icons/hi2";
import { BsSpeedometer2 } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import { Separator } from "@/components/ui/separator";
import FinancialCalculator from "./FinancialCalculator";
const DeatailHeader = ({ carDetails }) => {
  const features = carDetails?.features;
  //   console.log("features here are", features);
  const featuresArray = Object.keys(features);
  console.log(featuresArray);

  return (
    <div>
      <h2 className="font-primaryBold text-xl ">{carDetails?.listingTitle}</h2>
      <p className="text-sm text-gray-600">{carDetails?.tagline}</p>
      <div className="flex gap-3 items-center mt-2">
        <div className="flex gap-2 items-center bg-helper rounded-full p-1 w-20 h-8  cursor-pointer justify-center ">
          <HiCalendarDays className="h-4 w-4 text-white" />
          <span className="text-[10px] text-white">{carDetails?.year}</span>
        </div>
        <div className="flex gap-2 items-center bg-helper rounded-full p-1 w-20 h-8  cursor-pointer justify-center ">
          <BsSpeedometer2 className="h-4 w-4 text-white" />
          <span className="text-[10px] text-white">{carDetails?.mileage}</span>
        </div>
        <div className="flex gap-2 items-center bg-helper rounded-full p-1 w-20 h-8  cursor-pointer justify-center ">
          <BsSpeedometer2 className="h-4 w-4 text-white" />
          <span className="text-[10px] text-white">
            {carDetails?.transmission}
          </span>
        </div>
        <div className="flex gap-2 items-center bg-helper rounded-full p-1 w-20 h-8  cursor-pointer justify-center ">
          <HiCalendarDays className="h-4 w-4 text-white" />
          <span className="text-[10px] text-white">{carDetails?.fuelType}</span>
        </div>
      </div>
      <div className="mt-5">
        <img
          src={carDetails?.images[0].imageUrl}
          className="w-[90%] h-[300px] rounded-md mt-3 object-cover"
        />
        <div className="p-4 max-w-[90%] border shadow-sm rounded-md my-5 ">
          <h2 className="font-primaryBold text-xl py-2">Description</h2>

          <p className="text-gray-600 text-sm italic text-justify line-clamp-6 ">
            {carDetails?.listingDescription}
          </p>
        </div>
      </div>
      {/* {console.log(carDetails?.features)} */}
      {/* {JSON.stringify(carDetails?.features)} */}
      {/* <Separator className="mt-3" /> */}
      <div className="max-w-[90%] mb-5 border shadow-sm p-5">
        <h2 className="text-xl font-primaryBold py-5">Features</h2>
        <div className="grid md:grid-cols-3 items-center gap-5">
          {featuresArray?.map((item, index) => {
            return (
              <div key={index} className="flex gap-2 items-center">
                <Check className="text-white p-1 rounded-full bg-helper" />
                <h3 className="text-sm font-primaryItalic">{item}</h3>
              </div>
            );
          })}
        </div>
      </div>

      <Separator className="mt-3" />
      <FinancialCalculator carDetails={carDetails} />
    </div>
  );
};

export default DeatailHeader;
