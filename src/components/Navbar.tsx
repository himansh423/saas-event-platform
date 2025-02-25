import { Rowdies } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import logo from "../../public/tempLogo.png";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { navbarActions } from "@/redux/navbarSlice";
import { useEffect } from "react";
import { userAction } from "@/redux/userSlice";
import axios from "axios";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

const Navbar = () => {
  const { isOpen } = useSelector((store: RootState) => store.navbar);
  const { loggedInUser } = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/decode-token");
        const data = await response.json();
        if (data?.user) {
          dispatch(userAction.setLoggedInUser({ data: data.user }));
        }
      } catch (error) {
        console.error("Error fetching logged-in user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    const res = await axios.post("/api/auth/logout");

    if (res.data.success) {
      window.location.reload();
    }
  };
  console.log("loggedin User:", loggedInUser)
  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-[100px] bg-black border-b-[1px] border-[#333] px-8 flex justify-between items-center text-white pr-12 sticky top-0 z-50"
    >
      <Link href={"/"}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-[160px] h-[60px] relative"
        >
          <Image src={logo} alt="logo" fill className="object-cover invert" />
        </motion.div>
      </Link>

      <div
        className={`${rowdies1.className} flex items-center gap-12 absolute left-[50%] translate-x-[-50%] text-2xl`}
      >
        {["Blog", "Hackathons", "Events"].map((item) => (
          <motion.div
            key={item}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={`/${item.toLowerCase()}`} className="relative group">
              <span className="text-white group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-[#0c1feb] group-hover:bg-clip-text group-hover:text-transparent">
                {item}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0c1feb] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </motion.div>
        ))}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link href={`/team-up`} className="relative group">
            <span className="text-white group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-[#0c1feb] group-hover:bg-clip-text group-hover:text-transparent">
              Team Up
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0c1feb] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </motion.div>
      </div>

      <div className="flex gap-5 text-3xl items-center">
        <motion.div whileHover={{ scale: 1.05 }} className="relative  ">
          <div
            onClick={() => dispatch(navbarActions.setIsOpen())}
            className="flex gap-2 items-center text-xl p-2 border-[1px] border-[#333] rounded-[30px] hover:border-[#0c1feb] hover:shadow-[0_0_15px_rgba(12,31,235,0.3)] transition-all duration-300 cursor-pointer group"
          >
            <FaRegUserCircle className="text-[#0c1feb] group-hover:text-white transition-colors duration-300" />
            <p className="group-hover:text-[#0c1feb] transition-colors duration-300">
              {loggedInUser?.firstName}
            </p>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="mt-[5px] text-[#0c1feb] group-hover:text-white transition-colors duration-300"
            >
              <IoMdArrowDropdown />
            </motion.div>
          </div>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-[300px] rounded-md shadow-lg bg-black ring-1 ring-[#333] divide-y divide-[#333] focus:outline-none"
            >
              <div className="py-1">
                <Link
                  onClick={() => dispatch(navbarActions.setIsOpen())}
                  href={`/profile/${loggedInUser?.username}`}
                  className="block px-4 py-2  text-white hover:bg-[#111] hover:text-[#0c1feb] transition-colors duration-200 text-xl"
                >
                  My Profile
                </Link>
                <Link
                  onClick={() => dispatch(navbarActions.setIsOpen())}
                  href="/my-events-and-hackathons"
                  className="block px-4 py-2  text-white hover:bg-[#111] hover:text-[#0c1feb] transition-colors duration-200 text-xl"
                >
                  My Saved Events/Hackathons
                </Link>

                <Link
                  onClick={() => dispatch(navbarActions.setIsOpen())}
                  href="/my-team-up"
                  className="block px-4 py-2  text-white hover:bg-[#111] hover:text-[#0c1feb] transition-colors duration-200 text-xl"
                >
                  My Team Up
                </Link>
                <Link
                  onClick={() => dispatch(navbarActions.setIsOpen())}
                  href="/applied-team-up"
                  className="block px-4 py-2  text-white hover:bg-[#111] hover:text-[#0c1feb] transition-colors duration-200 text-xl"
                >
                  Applied Team Up
                </Link>
                <Link
                  onClick={() => dispatch(navbarActions.setIsOpen())}
                  href="/create-teamup"
                  className="block px-4 py-2  text-white hover:bg-[#111] hover:text-[#0c1feb] transition-colors duration-200 text-xl"
                >
                  Create Team Up
                </Link>
                <div
                  onClick={handleLogout}
                  className="block px-4 py-2  text-white hover:bg-[#111] hover:text-[#0c1feb] transition-colors duration-200 text-xl"
                >
                  <div className="flex items-center gap-1">
                    <p>Logout</p>
                    <div className="mt-1">
                      <MdOutlineLogout />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
