'use client'
import { Rowdies } from "next/font/google";
import Link from "next/link";
import { PiShareFatDuotone } from "react-icons/pi";
import { Bookmark } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { eventCardActions } from "@/redux/eventCardSlice";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

const EventCard = ({ card }: { card: any }) => {
  const { isSaved, showModal } = useSelector(
    (store: RootState) => store.eventCard
  );
  const dispatch = useDispatch();
  const toggleFavorite = () => {
    dispatch(eventCardActions.setIsFavourite());
    if (!isSaved) {
      dispatch(eventCardActions.setShowModal());
      // Close modal after 2 seconds
      setTimeout(() => dispatch(eventCardActions.setShowModal()), 2000);
    }
  };
  const setShowModal = () => {
    dispatch(eventCardActions.setShowModal());
  };
  return (
    <div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-black border border-zinc-800">
          <DialogHeader>
            <DialogTitle
              className={`${rowdies1.className} text-xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
            >
              Added to Your Hackathons!
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              You can find this hackathon in your saved collection.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="w-[400px] h-[530px] text-white  bg-black border border-zinc-800 rounded-2xl p-6 flex flex-col shadow-[0_0_0_2px_#0c1feb]  hover:shadow-[0_0_0_4px_#0c1feb] transition-transform">
        <p
          className={`${rowdies1.className} text-2xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent mb-3`}
        >
          {card.name}
        </p>
        <p className="text-gray-400">{card.shortDescription}</p>
        <div className="flex flex-col gap-3 mt-5">
          <div className="flex gap-2 items-center ">
            <div className=" bg-gradient-to-r rounded-full text-[#0c1feb] from-blue-400 to-[#0c1feb] h-[6px] w-[6px] mt-[2px]" />
            <p className={`text-gray-300`}>{card.date}</p>
          </div>
          <div className="flex gap-2 items-center ">
            <div className=" bg-gradient-to-r rounded-full text-[#0c1feb] from-blue-400 to-[#0c1feb] h-[6px] w-[6px] mt-[2px]" />
            <p className={`text-gray-300`}>{card.location}</p>
          </div>
          <div className="flex gap-2 items-center ">
            <div className=" bg-gradient-to-r rounded-full text-[#0c1feb] from-blue-400 to-[#0c1feb] h-[6px] w-[6px] mt-[2px]" />
            <p className={`text-gray-300`}>{card.modeOfEvent}</p>
          </div>
          <div className="flex  mt-5  text-white justify-between items-center">
            <div className="flex gap-4   text-2xl">
              <div className="bg-gray-900 rounded-full p-3">
                <PiShareFatDuotone />
              </div>
              <button
                onClick={toggleFavorite}
                className={`bg-gray-900 rounded-full p-3 transition-colors ${
                  isSaved ? "text-[#0c1feb]" : "text-white"
                }`}
                aria-label={
                  isSaved ? "Remove from favorites" : "Add to favorites"
                }
              >
                <Bookmark
                  className={`w-6 h-6 ${isSaved ? "fill-current" : ""}`}
                />
              </button>
            </div>
            <div className="w-fit h-[40px] px-7 flex justify-center items-center bg-gradient-to-r  rounded-md  from-blue-500 to-[#0c1feb] text-white">
              <p className={`${rowdies1.className}`}>
                {card.isOpen ? "OPEN" : "CLOSED"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p
              className={`${rowdies1.className} font-bold text-gray-400 text-[10px]`}
            >
              THEME
            </p>
            <div className="w-full h-[70px] p-2 flex flex-wrap gap-2 bg-gray-900 rounded-lg">
              {card.theme.map((item: string) => (
                <div className="px-[4px] h-[30px] bg-gradient-to-r from-blue-500 to-[#0c1feb] flex justify-center items-center text-[12px] rounded-lg text-[#e4e0e0]">
                  <p className={rowdies1.className}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <Link
            href={`/overview/${card._id}`}
            className="w-full h-[60px] flex items-center justify-center bg-gradient-to-r from-blue-500 to-[#0c1feb] mt-3 rounded-lg hover:bg-gradient-to-l"
          >
            <p className={`${rowdies1.className}`}>Apply Now</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
