import { Rowdies } from "next/font/google";
import EventCard from "./EventCard";
import SearchAndFilterBox from "./SearchAndFilterBox";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
const EventsPage = () => {
  return (
    <div className="min-h-screen w-screen bg-black">
      <div className="w-full flex flex-col gap-4 items-center pt-10">
        <h1
          className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent text-7xl `}
        >
          Events
        </h1>
        <p className="text-zinc-400 text-xl">
          Discover the latest insights, tutorials, and updates from our team.
        </p>
      </div>
      <div>
      <div className="mt-20 px-7">
        <SearchAndFilterBox/>
      </div>
      <div className="w-full grid grid-cols-3 place-items-center py-10 mt-4 ">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div className="mt-16" key={item}>
            <EventCard  />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default EventsPage;
