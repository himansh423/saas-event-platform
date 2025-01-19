import EventCard from "./EventCard";
import SearchAndFilterBox from "./SearchAndFilterBox";
const HomeEventsAndHackathonsSection = () => {
  return (
    <div className="w-screen min-h-screen px-9 py-14 ">
      <SearchAndFilterBox />
      <div className="w-full grid grid-cols-3   max-xl:grid-cols-2 place-items-center py-10 mt-24 ">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div className="mb-16 " key={item}>
            <EventCard  />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeEventsAndHackathonsSection;
