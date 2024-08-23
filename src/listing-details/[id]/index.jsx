import React, { useEffect, useState } from "react";
import Header from "@/components/ui/custom/Header";
import { db } from "../../../config";
import { useParams } from "react-router-dom";
import { CarImages, CarListing } from "../../../config/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/clerk-react";
import DeatailHeader from "../components/DeatailHeader";
import RightSideCode from "../components/RightSideCode";
import Footer from "@/components/ui/custom/Footer";
import MostSearchedCar from "@/components/ui/custom/MostSearchedCar";

const ListingDetails = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [carDetails, setCarDetails] = useState(null); // State for a single car item
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    getDetails();
  }, [id]); // Dependency on id to refetch if it changes

  const getDetails = async () => {
    try {
      const response = await db
        .select({
          listing: CarListing,
          images: CarImages,
        })
        .from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(eq(CarListing.id, id));

      if (response.length === 0) {
        throw new Error("Listing not found");
      }

      // Group the single car listing with its corresponding images
      const carItem = response.reduce((acc, curr) => {
        if (!acc.id) {
          acc = { ...curr.listing, images: [] };
        }
        if (curr.images?.id) {
          acc.images.push(curr.images);
        }
        return acc;
      }, {});

      setCarDetails(carItem);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching car details:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto bg-white min-h-screen">
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : carDetails ? (
        <div className="my-12 grid grid-cols-12 ">
          <div className="grid md:col-span-8 ">
            <DeatailHeader carDetails={carDetails} />
          </div>
          <div className=" grid md:col-span-4 mt-5">
            <RightSideCode carDetails={carDetails} />
          </div>
        </div>
      ) : (
        <p>No listing found.</p>
      )}
      <Footer />
    </div>
  );
};

export default ListingDetails;
