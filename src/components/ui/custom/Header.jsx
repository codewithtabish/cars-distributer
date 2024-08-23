import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useLocation, useNavigation } from "react-router-dom";
import { Button } from "../button";
import { PlusCircle } from "lucide-react";

const Header = () => {
  const { isSignedIn } = useUser();
  const location = useLocation();
  const isProfileRoute = location.pathname === "/profile";
  return (
    <div className="flex justify-between items-center py-2 border-b-2 border-gray-100">
      <img src="/logo.svg" width={120} height={120} />
      <ul className="flex gap-4 items-center">
        <li>
          <Link
            to={"/"}
            className="font-medium text-gray-600 hover:text-gray-900 text-xl font-primaryBold"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to={"/"}
            className="font-medium text-gray-600 hover:text-gray-900 text-xl font-primaryBold"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to={"/"}
            className="font-medium text-gray-600 hover:text-gray-900 text-xl font-primaryBold"
          >
            Blogs
          </Link>
        </li>
        <li>
          <Link
            to={"/contact"}
            className="font-medium text-gray-600 hover:text-gray-900 text-xl font-primaryBold"
          >
            Contact{" "}
          </Link>
        </li>
      </ul>
      <div>
        {isSignedIn ? (
          <div className="flex gap-4 items-center">
            {isProfileRoute ? (
              <div className="flex gap-2 items-center justify-center">
                <UserButton />
                <Link to={"/add-listing"} className="flex gap-2 items-center">
                  <Button className="flex gap-2 items-center px-4">
                    <PlusCircle className="w-5 h-5" />
                    Add Listing
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <UserButton />
                <Link to={"/profile"}>
                  <Button>Submit Listing</Button>
                </Link>
              </>
            )}
          </div>
        ) : (
          <div>
            <SignInButton forceRedirectUrl="/" mode="modal">
              <Button>Submit Listing</Button>
            </SignInButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
