"use client";
import { formatEventDate } from "@/utils/dateFormatters";

interface CardData {
  _id: string;
  name: string;
  shortDescription: string;
  dateStart: string | Date;
  dateEnd: string | Date;
  modeOfEvent: string;
  isOpen: boolean;
  theme: string[];
  location: string;
  prize: string;
}

const CardDate = ({ card }: { card: CardData }) => {
  const formattedDate = formatEventDate(
    typeof card.dateStart === "string"
      ? card.dateStart
      : card.dateStart.toISOString(),
    typeof card.dateEnd === "string" ? card.dateEnd : card.dateEnd.toISOString()
  );

  return (
    <div className="flex gap-2 items-center">
      <div className="bg-gradient-to-r rounded-full text-[#0c1feb] from-blue-400 to-[#0c1feb] h-[6px] w-[6px] mt-[2px]" />
      <p className="text-gray-300">{formattedDate}</p>
    </div>
  );
};

export default CardDate;
