"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

const ShowFooter = () => {
  const pathname = usePathname();

  // Regular expressions to match dynamic paths
  const hideFooterPaths = [/^\/login$/, /^\/register$/, /^\/verify-otp$/];

  // Check if the current pathname matches any of the hideNavbarPaths
  const shouldFooterNavbar = hideFooterPaths.some((pattern) =>
    pattern.test(pathname)
  );

  return <div>{!shouldFooterNavbar && <Footer />}</div>;
};

export default ShowFooter;
