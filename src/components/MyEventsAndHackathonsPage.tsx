import { Rowdies } from "next/font/google";
import EventCard from "./EventCard";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
const MyEventsAndHackathonsPage = () => {
  return (
    <div className="w-screen min-h-screen bg-black">
      <div className="w-full flex flex-col gap-4 items-center pt-10">
        <h1
          className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent text-7xl `}
        >
          Saved Hackathons & Events
        </h1>
        <p className="text-zinc-400 text-xl">
          Discover the latest insights, tutorials, and updates from our team.
        </p>
      </div>
      <div className="w-full grid grid-cols-3 place-items-center py-10 mt-4 ">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div className="mt-16" key={item}>
            <EventCard  />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEventsAndHackathonsPage;
