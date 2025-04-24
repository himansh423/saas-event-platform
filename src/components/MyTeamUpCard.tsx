"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import { Rowdies } from "next/font/google";
import TeamUpDate from "./TeamUpDate";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { teamUpAction } from "@/redux/teamUpSlice";
import axios from "axios";
import ApplicationBox from "./ApplicationBox";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

interface AppliedBy {
  firstName: string;
  lastName: string;
  username: string;
  profilePicture: string;
}

interface MyTeamUp {
  _id: string;
  hackName: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  location: string;
  email: string;
  mobileNumber: string;
  appliedBy: AppliedBy[];
  eventOrHackathonUrl: string;
}

const MyTeamUpCard = ({ myTeamUp }: { myTeamUp: MyTeamUp }) => {
  const [visibleBoxId, setVisibleBoxId] = useState<string | null>(null);
  const { userId, appliedTeamUps } = useSelector(
    (store: RootState) => store.teamup
  );
  const dispatch = useDispatch();
  const isApplied = appliedTeamUps[myTeamUp._id] || false;

  const handleWithdraw = async (id: string) => {
    try {
      const res = await axios.patch(`/api/apply-for-teamup/${userId}`, {
        id,
      });
      if (res.data.successWithdraw) {
        dispatch(
          teamUpAction.setTeamUpApplicationStatus({
            teamUpId: id,
            isApplied: false,
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ApplicationBox 
        myTeamUp={myTeamUp} 
        isVisible={visibleBoxId === myTeamUp._id}
        onClose={() => setVisibleBoxId(null)}
      />
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
        <div className="flex flex-col gap-2">
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
          <button
            onClick={() => setVisibleBoxId(myTeamUp._id)}
            className={`bg-gradient-to-r w-1/2 from-blue-400 to-[#05f240]
             h-[40px] rounded-sm flex justify-center items-center cursor-pointer`}
          >
            <p className={`${rowdies1.className} text-white`}>Check Applications</p>
          </button>

          <a
            href={myTeamUp.eventOrHackathonUrl}
            className={`${
              isApplied ? "w-1/3" : "w-1/2"
            } h-[40px] bg-gradient-to-r from-blue-400 to-[#0c1feb] rounded-sm flex justify-center items-center cursor-pointer`}
          >
            <p className={`${rowdies1.className} text-white`}>More Info</p>
          </a>
          
          <button
            onClick={() => handleWithdraw(myTeamUp._id)}
            className={`
                 bg-gradient-to-r w-1/3 from-blue-400 to-[#ff0d3e]
                 
             h-[40px] rounded-sm flex justify-center items-center cursor-pointer`}
          >
            <p className={`${rowdies1.className} text-white`}>Delete</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default MyTeamUpCard;