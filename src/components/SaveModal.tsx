"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PiShareFatDuotone } from "react-icons/pi";
import { eventCardActions } from "@/redux/eventCardSlice";
import { RootState } from "@/redux/store";
import { Rowdies } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { Bookmark } from "lucide-react";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

const SaveModal = () => {
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
    </div>
  );
};

export const SaveButton = () => {
  const { isSaved } = useSelector((store: RootState) => store.eventCard);
  const dispatch = useDispatch();

  const toggleFavorite = () => {
    dispatch(eventCardActions.setIsFavourite());
    if (!isSaved) {
      dispatch(eventCardActions.setShowModal());
      setTimeout(() => dispatch(eventCardActions.setShowModal()), 2000);
    }
  };

  return (
    <div className="flex gap-4 text-2xl">
      <div className="bg-gray-900 rounded-full p-3">
        <PiShareFatDuotone />
      </div>
      <button
        onClick={toggleFavorite}
        className={`bg-gray-900 rounded-full p-3 transition-colors ${
          isSaved ? "text-[#0c1feb]" : "text-white"
        }`}
        aria-label={isSaved ? "Remove from favorites" : "Add to favorites"}
      >
        <Bookmark className={`w-6 h-6 ${isSaved ? "fill-current" : ""}`} />
      </button>
    </div>
  );
};

export default SaveModal;
