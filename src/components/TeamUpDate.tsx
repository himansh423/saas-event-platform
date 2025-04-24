"use client";
import { formatEventDate } from "@/utils/dateFormatters";
import { Calendar } from "lucide-react";
interface MyTeamUp {
  _id: string; // Optional if not provided in the API
  hackName: string;
  description: string;
  dateStart: Date; // JSON returns date as string, not Date object
  dateEnd: Date;
  location: string;
  email: string;
  mobileNumber: string;
  appliedBy: {
    firstName: string;
    lastName: string;
    username: string;
    profilePicture: string;
  }[];
  eventOrHackathonUrl: string;
}
const TeamUpDate = ({ teamUp }: { teamUp: MyTeamUp }) => {
  const formattedDate = formatEventDate(
    typeof teamUp.dateStart === "string"
      ? teamUp.dateStart
      : teamUp.dateStart.toISOString(),
    typeof teamUp.dateEnd === "string"
      ? teamUp.dateEnd
      : teamUp.dateEnd.toISOString()
  );
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
