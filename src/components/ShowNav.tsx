"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const ShowNav = () => {
  const pathname = usePathname();

  // Regular expressions to match dynamic paths
  const hideNavbarPaths = [/^\/auth\/login$/,/^\/auth\/register$/, /^\/auth\/verify-otp\/[^\/]+$/];

  // Check if the current pathname matches any of the hideNavbarPaths
  const shouldHideNavbar = hideNavbarPaths.some((pattern) =>
    pattern.test(pathname)
  );

  return <div>{!shouldHideNavbar && <Navbar />}</div>;
};

export default ShowNav;
