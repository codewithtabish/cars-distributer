import React, { useState } from "react";
import { GalleryHorizontal, LucideFuel, SpadeIcon } from "lucide-react";
import { Separator } from "../separator";
import { Button } from "../button";
import { FaTrashAlt } from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import CarItemDeleteDialouge from "./CarItemDeleteDialouge";
import { db } from "../../../../config";
import { CarListing, CarImages } from "../../../../config/schema";
import { eq } from "drizzle-orm";
import { useToast } from "@/components/ui/use-toast";

const CarItem = ({ item, fromHome, handleDelete }) => {
  const { user } = useUser();
  const [isDelete, setisDelete] = useState(false);
  const { toast } = useToast();
  // Access the images from the item object
  const firstImageUrl = item.images?.[0]?.imageUrl || "default-image-url-here"; // Fallback URL if no image

  const handleCanel = () => {
    setisDelete(false);
  };

  return (
    <Link to={"/listing-details/" + item.id}>
      <div className="cursor-pointer border bg-white hover:shadow-md rounded-xl pb-1 relative">
        <img
          src={firstImageUrl}
          height={200}
          className="w-full rounded-md max-h-[200px] min-h-[200px]"
          alt="Car"
        />
        <h2 className="text-[20px] font-primaryRegular text-gray-600 mt-2 ml-2">
          {item.listingTitle}
        </h2>
        <Separator className="my-2 border-gray-300 border-[1px]" />
        <div className="flex gap-3 items-center justify-between max-w-[80%] mx-auto">
          <div className="flex justify-center items-center flex-col gap-2">
            <LucideFuel className="w-5 h-5 text-gray-400" />
            <span className="text-[10px] font-primaryItalic text-gray-500">
              {item.mileage || "N/A"} Miles
            </span>
          </div>
          <div className="flex justify-center items-center flex-col gap-2">
            <SpadeIcon className="w-5 h-5 text-gray-400" />
            <span className="text-[10px] font-primaryItalic text-gray-500">
              {item.fuelType || "N/A"}
            </span>
          </div>
          <div className="flex justify-center items-center flex-col gap-2">
            <GalleryHorizontal className="w-5 h-5 text-gray-400" />
            <span className="text-[10px] font-primaryItalic text-gray-500">
              {item.transmission || "N/A"}
            </span>
          </div>
        </div>
        <Separator className="my-2 border-gray-300 border-[1px]" />
        <div className="flex justify-between items-center max-w-[80%] mx-auto">
          <h2 className="font-primaryBold font-bold">${item.sellingPrice}</h2>

          <span className="text-primary text-sm text-[12px] italic">
            View Details
          </span>
        </div>
        {user?.primaryEmailAddress?.emailAddress === item?.createdBy &&
          fromHome != true && (
            <div className="flex justify-between items-center mt-4">
              <Link
                to={"/add-listing?mode=edit&id=" + item?.id}
                className="w-full"
              >
                <Button variant="outline" className="w-full">
                  Edit
                </Button>
              </Link>
              <Button variant="destructive" onClick={() => setisDelete(true)}>
                <FaTrashAlt />
              </Button>
            </div>
          )}
      </div>
      <CarItemDeleteDialouge
        isDelete={isDelete}
        setisDelete={setisDelete}
        handleDelete={handleDelete}
        handleCanel={handleCanel}
        item={item}
      />
    </Link>
  );
};

export default CarItem;
