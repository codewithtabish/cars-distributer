import React from "react";
import { Button } from "@/components/ui/button";
import CarSpecification from "@/shared/CarSpecification";
import { MdOutlineLocalOffer } from "react-icons/md";

// Import necessary icons from react-icons
import {
  FaCar,
  FaCheckCircle,
  FaIndustry,
  FaCarSide,
  FaCalendarAlt,
  FaRoad,
  FaCogs,
  FaGasPump,
  FaTachometerAlt,
  FaWrench,
  FaCircle,
  FaPalette,
  FaDoorClosed,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Service from "@/shared/Service";
import { useUser } from "@clerk/clerk-react";

const RightSideCode = ({ carDetails }) => {
  const { user } = useUser();
  const userID = user?.primaryEmailAddress?.emailAddress?.split("@")[0];
  console.log("The user Id is ", userID);
  const SendBirdApplicationId = import.meta.env.VITE_SEND_BIRD_APP_ID;
  const SendBirdApiToken = import.meta.env.VITE_SEND_BIRD_API_KEY;
  const ownerUserID = carDetails?.createdBy?.split("@")[0];

  const navigate = useNavigate();

  console.log("SendBirdApiToken", SendBirdApiToken);
  console.log("SendBirdApplicationId", SendBirdApplicationId);
  console.log("The owner userId is ", ownerUserID);
  console.log("The user userId is ", userID);
  // Icon map to match specification names to their icons
  const iconMap = {
    FaCar: <FaCar />,
    FaCheckCircle: <FaCheckCircle />,
    FaIndustry: <FaIndustry />,
    FaCarSide: <FaCarSide />,
    FaCalendarAlt: <FaCalendarAlt />,
    FaRoad: <FaRoad />,
    FaCogs: <FaCogs />,
    FaGasPump: <FaGasPump />,
    FaTachometerAlt: <FaTachometerAlt />,
    FaWrench: <FaWrench />,
    FaCircle: <FaCircle />,
    FaPalette: <FaPalette />,
    FaDoorClosed: <FaDoorClosed />,
  };
  const onMessageOwnerButtonClick = async () => {
    try {
      const response = await Service.CreateSendBirdUser(
        userID,
        user?.fullName,
        user?.imageUrl
      );
      console.log("The response is ", response);
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server responded with a status:", error.response.status);
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
      console.error("Axios error:", error.config);
    }
    try {
      const response = await Service.CreateSendBirdUser(
        ownerUserID,
        carDetails?.fullName,
        carDetails?.imageUrl
      ).then((e) => console.log("The car owner ", response));

      //   const

      //   console.log("The owner is ", owner);
    } catch (error) {}
    try {
      const response = await Service.CreateSendBirdChannel(
        [userID, ownerUserID],
        carDetails?.listingTitle
      ).then((e) => console.log("The last channel is", e));

      navigate("/profile");
    } catch (error) {
      console.log("The error at creating channel  is ", error);
    }
  };

  return (
    <div className="my-5">
      <div className="p-7 rounded-xl shadow-md">
        <h2 className="text-xl font-primaryBold py-2 text-gray-700">
          Our Pricing
        </h2>
        <h3 className="text-gray-700 font-primaryRegular font-bold">
          $ {carDetails?.sellingPrice}
        </h3>
        <Link
          to={"#"}
          className="mt-8 w-[90%] block"
          onClick={onMessageOwnerButtonClick}
        >
          <Button className="mt-0 w-full bg-helper">
            <MdOutlineLocalOffer />
            <span className="ml-2 text-white">Get Offer</span>
          </Button>
        </Link>
      </div>

      {/* Car Specifications */}
      <div className="mt-5 rounded-xl shadow-md border p-5">
        <h2 className="text-xl font-primaryBold py-2 mb-5 text-gray-700">
          Car Specifications
        </h2>
        <div>
          {CarSpecification?.map((item, index) => (
            <div key={index} className="flex items-center mb-4 flex-row gap-4 ">
              <div className="flex flex-row gap-2 items-center flex-1">
                <span className="mr-2  bg-helper rounded-full p-2 text-white">
                  {iconMap[item.icon]}
                </span>
                <span className="font-primaryRegular font-bold text-gray-700">
                  {item.label}:
                </span>
              </div>
              <div className="flex-0.5">
                <span className="ml-2 font-bold font-primaryItalic text-sm mr-4 text-gray-700">
                  {carDetails[item.name]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSideCode;
