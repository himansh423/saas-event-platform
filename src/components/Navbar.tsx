import { Rowdies } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineNotificationsNone } from "react-icons/md";
import logo from "../../public/tempLogo.png";
import { IoMdArrowDropdown } from "react-icons/io";
const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
const Navbar = () => {
  return (
    <nav className="w-screen min-h-[100px] bg-black border-b-[2px] border-[#0c1feb] px-8 flex justify-between items-center text-white pr-12">
      <div className="w-[160px] invert filter h-[60px] relative">
        <Image src={logo.src} alt="logo" layout="fill" objectFit="cover" />
      </div>
      <div
        className={`${rowdies1.className} flex items-center gap-12 absolute left-[50%] translate-x-[-50%] text-2xl`}
      >
        <Link href={"/blog"}>Blog</Link>
        <p>Events</p>
        <p>Hackathons</p>
      </div>
      <div className="flex gap-5 text-3xl items-center">
        <div className="pt-[1px] mt-[3px]">
          <MdOutlineNotificationsNone />
        </div>
        <div className="flex gap-2 items-center text-xl p-2 border-dashed border-[1px] rounded-[30px]">
          <div >
            <FaRegUserCircle />
          </div>
          <p>Himanshu</p>
          <div className="mt-[5px]">
            <IoMdArrowDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
