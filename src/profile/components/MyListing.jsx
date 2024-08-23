import React, { useEffect, useState } from "react";
import { db } from "../../../config";
import { CarListing, CarImages } from "../../../config/schema";
import { desc, eq } from "drizzle-orm";
import { useUser } from "@clerk/clerk-react";
import Service from "@/shared/Service";
import CarItem from "@/components/ui/custom/CarItem";
import SkeletonCard from "@/components/ui/custom/CarItemSkelton";
import Footer from "@/components/ui/custom/Footer";

const MyListing = () => {
  const { user } = useUser();
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (user) {
      getAllListing();
    }
  }, [user]);

  const getAllListing = async () => {
    try {
      const result = await db
        .select({
          listing: CarListing,
          images: CarImages,
        })
        .from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(
          eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(CarListing.id));

      console.log("Fetched Result:", result);

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

      console.log("Grouped Result:", groupedResult);

      // Convert the grouped result into an array
      const formattedResult = Object.values(groupedResult);
      console.log("Formatted Result:", formattedResult);

      setListing(formattedResult);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error fetching listings:", error);
      setLoading(false); // Set loading to false on error
    }
  };

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-4 items-center min-h-[70vh] mt-5 mb-32">
        {loading ? (
          // Show skeletons while loading
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : listing.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          listing.map((item, index) => <CarItem key={index} item={item} />)
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyListing;
