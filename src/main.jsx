import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./home.jsx";
import ContactPage from "./contact";
import { ClerkProvider } from "@clerk/clerk-react";
import ProfilePage from "./profile";
import AddListing from "./add-listing";
import { Toaster } from "@/components/ui/toaster";
import SearchCategory from "./search/[category]";
import CarSearchByQuery from "./search";
import ListingDetails from "./listing-details/[id]";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/add-listing",
    element: <AddListing />,
  },
  {
    path: "/search/:category",
    element: <SearchCategory />,
  },
  {
    path: "/search",
    element: <CarSearchByQuery />,
  },
  {
    path: "/listing-details/:id",
    element: <ListingDetails />,
  },
]);

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={
        "pk_test_YXJyaXZpbmctYmVkYnVnLTc4LmNsZXJrLmFjY291bnRzLmRldiQ"
      }
      signUpForceRedirectUrl="/"
    >
      <RouterProvider router={router} />
      <Toaster />
    </ClerkProvider>
  </StrictMode>
);
