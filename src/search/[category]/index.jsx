import React, { useEffect, useState } from "react";
import { db } from "../../../config";
import { CarListing, CarImages } from "../../../config/schema";
import { eq } from "drizzle-orm";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/ui/custom/Header";
import HeroSearch from "@/components/ui/custom/HeroSearch";
import CarItem from "@/components/ui/custom/CarItem"; // Import CarItem
import SkeletonCard from "@/components/ui/custom/CarItemSkelton";

const SearchCategory = () => {
  const { category } = useParams();
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (category) {
      getAllCategorySearchedCar();
    }
  }, [category]);

  const getAllCategorySearchedCar = async () => {
    try {
      setLoading(true);

      // Fetch data with join to get listings and images
      const result = await db
        .select({
          listing: CarListing,
          images: CarImages,
        })
        .from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(eq(CarListing.category, category));

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
      console.error("Error fetching car listings by category:", error);
      toast({
        title: "Error",
        description: "Unable to fetch car listings. Please try again later.",
      });
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
            listing.map((item, index) => (
              <CarItem
                key={index}
                item={item}
                fromHome={true}

                // handleDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchCategory;
