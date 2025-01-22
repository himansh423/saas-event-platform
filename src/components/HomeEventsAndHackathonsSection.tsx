"use client";
import { Rowdies } from "next/font/google";
import { useState, useEffect } from "react";
import axios from "axios";

import SearchAndFilterBox from "./SearchAndFilterBox";
import EventCard from "./EventCard";

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
}

const HomeEventsAndHackathonsSection = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEventCards = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get<CardData[]>("/api/get-event-from-database-without-image");
        console.log("Fetched data:", res.data);
        setCards(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    getEventCards();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen w-screen bg-black flex items-center justify-center">
        <p className="text-zinc-400">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-screen bg-black flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-black">
      <div className="w-full flex flex-col gap-4 items-center pt-10">
        <h1
          className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent text-7xl`}
        >
          Events
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
          {cards.length > 0 ? (
            cards.map((card) => (
              <div className="mt-16" key={card?._id}>
                <EventCard card={card} />
              </div>
            ))
          ) : (
            <div className="text-center text-zinc-400 text-lg mt-10">
              No events available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeEventsAndHackathonsSection;
