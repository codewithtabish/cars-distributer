import Header from "@/components/ui/custom/Header";
import React, { useState, useEffect } from "react";
import carDetails from "../shared/carDetails.json";
import TextInput from "./comonents/TextInput";
import DropDownField from "./comonents/DropDownField";
import { TextareaWithLabel } from "./comonents/TextAreaWithLabel";
import * as FaIcons from "react-icons/fa"; // Import all FaIcons from react-icons
import { Separator } from "@/components/ui/separator";
import features from "../shared/features.json";
import { FeatureBox } from "./comonents/FeatureBox";
import { Button } from "@/components/ui/button";
import { db } from "../../config/index";
import { CarImages, CarListing } from "../../config/schema";
import { useToast } from "@/components/ui/use-toast";
import UploadMultipleImages from "@/components/ui/custom/UploadMultipleImages";
import { FaSpinner } from "react-icons/fa"; // Import the spinner icon
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { eq } from "drizzle-orm";
import Footer from "@/components/ui/custom/Footer";

const AddListing = () => {
  const [formData, setformData] = useState([]);
  const [featureData, setfeatureData] = useState([]);
  const { toast } = useToast();
  const [loader, setloader] = useState(false);
  const [triggerUploadImges, setTriggerUploadImges] = useState();
  const [uploading, setUploading] = useState(false);
  const { user } = useUser();
  // Get the search parameters from the URL
  const [searchParams] = useSearchParams();

  // Retrieve the 'mode' and 'id' parameters
  const mode = searchParams.get("mode");
  const itemId = searchParams.get("id");

  useEffect(() => {
    console.log(mode);
    if (mode === "edit") {
      getCarDetails();
    }

    return () => {};
  }, [mode, itemId]);

  const handleChnage = (name, value) => {
    console.log(name, value);
    setformData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitMethod = async (e) => {
    e.preventDefault();
    try {
      setloader(true);
      const result = await db
        .insert(CarListing)
        .values({
          ...formData,
          features: featureData,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          postedOn: moment().format("DD/MM/YYYY"),
          userImageUrl: user?.imageUrl,
          userName: user?.fullName,
        })
        .returning({ id: CarListing.id });
      if (result) {
        setloader(false);
        setTriggerUploadImges(result[0]?.id);
        toast({
          title: "Record Added",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
      } else {
        setloader(false);
      }
    } catch (error) {
      setloader(false);
      toast({
        title: "Error",
        description: error.message,
      });
    } finally {
      setloader(false);
    }
  };

  const handleAddFeature = (name, value) => {
    setfeatureData((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(featureData);
  };

  const getCarDetails = async () => {
    try {
      const data = await db
        .select()
        .from(CarListing)
        .innerJoin(CarImages, eq(CarImages.carListingId, CarListing.id));
      where(eq(CarListing.id, itemId));
      console.log("The update data is ", data);
    } catch (error) {
      console.log("object");
    }
  };

  return (
    <div>
      <div className="container max-w-6xl mx-auto bg-white min-h-screen">
        <Header />
        <div className="my-8">
          <h1 className="text-2xl font-primaryBold">Add New Listing</h1>
          <form
            className="p-10 border rounded-xl mt-10"
            onSubmit={submitMethod}
          >
            <h2 className="text-xl font-primaryBold mb-8">Car Details</h2>
            {/* CAR DETAILS */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              {carDetails.carDetails.map((item, index) => {
                const IconComponent = FaIcons[item.icon];
                return (
                  <div key={index}>
                    <label
                      htmlFor={item.name}
                      className="my-2 text-sm font-primaryRegular flex items-center gap-2"
                    >
                      {IconComponent && (
                        <div className="bg-primary p-2 flex justify-center items-center rounded-full">
                          <IconComponent className="text-xl text-white w-4 h-4 " />
                        </div>
                      )}
                      {item?.label}
                      {item.required && (
                        <span className="text-red-600 ml-1">*</span>
                      )}
                    </label>
                    {item.fieldType === "text" ||
                    item.fieldType === "number" ? (
                      <TextInput item={item} handleChnage={handleChnage} />
                    ) : item.fieldType === "dropdown" ? (
                      <DropDownField item={item} handleChnage={handleChnage} />
                    ) : item.fieldType === "textarea" ? (
                      <TextareaWithLabel
                        item={item}
                        handleChnage={handleChnage}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
            <Separator className="my-6" />
            {/* CAR FEATURES */}
            <h2 className="text-xl font-primaryBold mb-8">Car Features</h2>
            <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
              {features.features.map((item, index) => (
                <FeatureBox
                  item={item}
                  index={index}
                  handleChnage={handleAddFeature}
                />
              ))}
            </div>
            <Separator className="my-8" />

            {/* CAR IMAGES */}
            <UploadMultipleImages
              triggerUploadImges={triggerUploadImges}
              uploading={uploading}
              setUploading={setUploading}
            />

            <div className="flex justify-end items-end my-8">
              <Button
                type="submit"
                className="flex justify-center items-center gap-2"
                disabled={loader || uploading}
              >
                {uploading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Uploading Images...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddListing;
