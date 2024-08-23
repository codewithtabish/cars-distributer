import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { eq } from "drizzle-orm";
import { db } from "../../config";
import { CarImages, CarListing } from "../../config/schema";
import Header from "@/components/ui/custom/Header";
import HeroSearch from "@/components/ui/custom/HeroSearch";
import SkeletonCard from "@/components/ui/custom/CarItemSkelton";
import CarItem from "@/components/ui/custom/CarItem";

const CarSearchByQuery = () => {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { toast } = useToast();  // Uncomment if you want to use the toast for error handling
  const [searchParam] = useSearchParams();
  const cars = searchParam.get("cars");
  const make = searchParam.get("make");
  const price = searchParam.get("price");

  useEffect(() => {
    getCarList();
  }, [cars, make, price]);

  const getCarList = async () => {
    try {
      let query = db
        .select({
          listing: CarListing,
          images: CarImages,
        })
        .from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId));

      // Add conditions dynamically based on search params
      if (cars) {
        query = query.where(eq(CarListing.condition, cars));
      }
      if (make) {
        query = query.where(eq(CarListing.make, make));
      }
      if (price) {
        // Assuming price is a single value; adjust logic if it's a range
        // query = query.where(eq(CarListing.price, price));
      }

      const result = await query;

      if (!result || !Array.isArray(result)) {
        throw new Error("Invalid result format");
      }

      // Group listings with their corresponding images
      const groupedResult = result.reduce((acc, curr) => {
        const listingId = curr.listing.id;

        if (!acc[listingId]) {
          acc[listingId] = {
            ...curr.listing,
            images: [],
          };
        }

        if (curr.images.id) {
          acc[listingId].images.push(curr.images);
        }

        return acc;
      }, {});

      // Convert the grouped result into an array
      const formattedResult = Object.values(groupedResult);

      setListing(formattedResult);
      setLoading(false);
    } catch (error) {
      // Uncomment and use toast for displaying the error if required
      // toast({
      //   title: "Error",
      //   description: "Unable to fetch car listings. Please try again later.",
      // });
      console.error("Error fetching car listings by search query:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto bg-white min-h-screen">
      <Header />
      <div className="my-12">
        <HeroSearch />
        <div className="grid md:grid-cols-4 gap-4 items-center my-12">
          {loading ? (
            // Show skeletons while loading
            Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : listing.length === 0 ? (
            <p>No listings found.</p>
          ) : (
            listing.map((item) => (
              <CarItem
                key={item.id}
                item={item}
                fromHome={true}
                // handleDelete={handleDelete} // Uncomment if you want to handle delete
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CarSearchByQuery;
