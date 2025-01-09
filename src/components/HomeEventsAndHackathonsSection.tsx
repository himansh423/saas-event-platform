import { Rowdies } from "next/font/google";
import { FaFilter, FaSearch } from "react-icons/fa";
import { PiShareFatDuotone } from "react-icons/pi";
import { RiTwitterXFill } from "react-icons/ri";
import EventCard from "./EventCard";
import SearchAndFilterBox from "./SearchAndFilterBox";
const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
const HomeEventsAndHackathonsSection = () => {
  return (
    <div className="w-screen min-h-screen px-9 py-14 ">
      <SearchAndFilterBox />
      <div className="w-full grid grid-cols-3 place-items-center py-10 mt-24 ">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div className="mb-16">
            <EventCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeEventsAndHackathonsSection;
