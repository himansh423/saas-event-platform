"use client";
import { formatEventDate } from "@/utils/dateFormatters";
import { Calendar } from "lucide-react";
const TeamUpDate = ({ teamUp }: { teamUp: any }) => {
  const formattedDate = teamUp
    ? formatEventDate(teamUp.dateStart, teamUp.dateEnd)
    : "";
  return (
    <div className="flex gap-1 items-center text-[14px] text-[#9CA3AF]">
      <div>
        <Calendar className="h-4 w-4" />
      </div>
      <p>{formattedDate}</p>
    </div>
  );
};

export default TeamUpDate;
