import { Mail, MapPin, Phone } from "lucide-react";
import { Rowdies } from "next/font/google";
import TeamUpDate from "./TeamUpDate";
import MyTeamUpButton from "./MyTeamUpButton";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

interface MyTeamUp {
  _id: string;
  hackName: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  location: string;
  email: string;
  mobileNumber: string;
  eventOrHackathonUrl: string;
}
const MyTeamUpCard = ({ myTeamUp }: { myTeamUp: MyTeamUp }) => {
  return (
    <>
      <div className="w-[467px] h-[367px] bg-[#111111] rounded-md border-[1px] border-[#222] flex flex-col items-start mb-12 justify-between px-4 py-5">
        <div className="flex flex-col gap-1">
          <p
            className={`${rowdies1.className} text-2xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
          >
            {myTeamUp.hackName}
          </p>
          <p className="text-[14px] text-[#A3A3A3]">Posted by you</p>
        </div>
        <div className="text-[#D1D5DB] text-[14px]">
          <p>{myTeamUp.description}</p>
        </div>
        <div className="flex  flex-col gap-2">
          <div>
            <TeamUpDate teamUp={myTeamUp} />
          </div>
          <div className="flex gap-1 items-center text-[14px] text-[#9CA3AF]">
            <div>
              <MapPin className="h-4 w-4" />
            </div>
            <p>{myTeamUp.location}</p>
          </div>
          <div className="flex gap-1 items-center text-[14px] text-[#9CA3AF]">
            <div>
              <Mail className="h-4 w-4" />
            </div>
            <p>{myTeamUp.email}</p>
          </div>
          <div className="flex gap-1 items-center text-[14px] text-[#9CA3AF]">
            <div>
              <Phone className="h-4 w-4" />
            </div>
            <p>{myTeamUp.mobileNumber}</p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full gap-5">
          <MyTeamUpButton teamUp={myTeamUp} />
        </div>
      </div>
    </>
  );
};

export default MyTeamUpCard;
