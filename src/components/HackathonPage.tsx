import { Rowdies } from "next/font/google";
import axios from "axios";
import SearchAndFilterBox from "@/components/SearchAndFilterBox";
import EventCard from "@/components/EventCard";
import { cookies } from "next/headers";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

interface CardData {
  _id: string;
  name: string;
  shortDescription: string;
  date: string;
  modeOfEvent: string;
  isOpen: boolean;
  theme: string[];
  location: string;
  prize: string;
}
const fetchUserDataFromCookie = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/decode-token",
        {
          headers: { Cookie: `token=${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      if (data?.user) {
        return data.user;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
};
const getEventAndHackathonCards = async () => {
  try {
    const res = await axios.get(
      "http://localhost:3000/api/get-event-from-database-without-image"
    );
    return res.data;
  } catch (error) {
    return [];
  }
};



const HackathonPage = async () => {
  const cards = await getEventAndHackathonCards();
  const loggedInUser = await fetchUserDataFromCookie();
  

  return (
    <div className="min-h-screen w-screen bg-black">
      <div className="w-full flex flex-col gap-4 items-center pt-10">
        <h1
          className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent text-7xl`}
        >
          Hackathons
        </h1>
        <p className="text-zinc-400 text-xl">
          Discover the latest insights, tutorials, and updates from our team.
        </p>
      </div>
      <div>
        <div className="mt-20 px-7">
          <SearchAndFilterBox />
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center py-10 mt-4">
          {cards && cards.length > 0 ? (
            cards.map((card: CardData) => (
              <div className="mt-16" key={card._id}>
                <EventCard card={card} userId={loggedInUser.userId}  />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-zinc-400">
              No events available at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HackathonPage;
