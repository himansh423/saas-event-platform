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
import axios from "axios";
import { useEffect, useState } from "react";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

const SaveModal = () => {
  const { showModal } = useSelector((store: RootState) => store.eventCard);
  const dispatch = useDispatch();

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

export const SaveButton = ({
  userId,
  cardId,
}: {
  userId: string;
  cardId: string;
}) => {
  const { savedItems } = useSelector((store: RootState) => store.eventCard);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const isSaved = savedItems?.includes(cardId);

  useEffect(() => {
    const fetchSavedHackathons = async () => {
      try {
        const res = await axios.get(`/api/get-user-data/${userId}`);
        if (res.data.success) {
          dispatch(
            eventCardActions.setSavedItems(res.data.user.savedEventAndHackathon)
          );
          console.log(savedItems);
          console.log(res.data);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Failed to fetch saved hackathons:", error.message);
        }
      }
    };

    fetchSavedHackathons();
  }, [userId, dispatch]);

  const toggleFavorite = async (cardId: string) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await axios.patch(`/api/save-event-or-hackathon/${userId}`, {
        id: cardId,
      });
      if (res.data.success) {
        dispatch(eventCardActions.toggleSavedItem(cardId));
        if (!isSaved) {
          dispatch(eventCardActions.setShowModal());
          setTimeout(() => dispatch(eventCardActions.setShowModal()), 2000);
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-4 text-2xl">
      <div className="bg-gray-900 rounded-full p-3">
        <PiShareFatDuotone />
      </div>
      <button
        onClick={() => toggleFavorite(cardId)}
        className={`bg-gray-900 rounded-full p-3 transition-colors ${
          isSaved ? "text-[#0c1feb]" : "text-white"
        }`}
        aria-label={isSaved ? "Remove from favorites" : "Add to favorites"}
        disabled={isLoading}
      >
        <Bookmark className={`w-6 h-6 ${isSaved ? "fill-current" : ""}`} />
      </button>
    </div>
  );
};

export default SaveModal;
