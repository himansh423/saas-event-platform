"use client";
import { formatEventDate } from "@/utils/dateFormatters";
const CardDate = ({ card }: { card: any }) => {
  const formattedDate = card
    ? formatEventDate(card.dateStart, card.dateEnd)
    : "";
  return (
    <div className="flex gap-2 items-center ">
      <div className=" bg-gradient-to-r rounded-full text-[#0c1feb] from-blue-400 to-[#0c1feb] h-[6px] w-[6px] mt-[2px]" />
      <p className={`text-gray-300`}>{formattedDate}</p>
    </div>
  );
};

export default CardDate;
