import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Theme from "./Theme";
import MobileNavbar from "./MobileNavbar";
import GlobalSearch from "../Search/GlobalSearch";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 text-white shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/assets/images/site-logo.svg" width={23} height={23} alt="Logo" />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          R<span className="text-primary-500">ofl</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex-between gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
            afterSignOutUrl="/"
          />
        </SignedIn>
        <MobileNavbar />
      </div>
    </nav>
  );
};
export default Navbar;
