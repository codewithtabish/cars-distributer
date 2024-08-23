import { useState, useEffect } from "react";
import Footer from "./components/ui/custom/Footer";
import Header from "./components/ui/custom/Header";
import Hero from "./components/ui/custom/Hero";
import InfoSection from "./components/ui/custom/InfoSection";
import MostSearchedCar from "./components/ui/custom/MostSearchedCar";
import Testmonial from "./components/ui/custom/Testmonial";
import VichelCategories from "./components/ui/custom/VichelCategories";
import { db } from "../config/index";
import { desc, eq } from "drizzle-orm";
import { CarImages, CarListing } from "../config/schema";
import { useUser } from "@clerk/clerk-react";

const HomePage = () => {
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
        // .where(
        //   eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress)
        // )
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

  console.log("The listing at home page is", listing);
  return (
    <div className="container max-w-6xl mx-auto bg-white min-h-screen">
      <Header />
      <Hero />
      <VichelCategories />
      <MostSearchedCar loading={loading} listing={listing} />
      <InfoSection />
      <Testmonial />
      <Footer />
    </div>
  );
};

export default HomePage;
