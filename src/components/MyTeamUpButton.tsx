"use client";
import { RootState } from "@/redux/store";
import { teamUpAction } from "@/redux/teamUpSlice";
import axios from "axios";
import { Rowdies } from "next/font/google";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

const MyTeamUpButton = ({ teamUp }: { teamUp: any }) => {
  const { userId, appliedTeamUps } = useSelector(
    (store: RootState) => store.teamup
  );
  const isApplied = appliedTeamUps[teamUp._id] || false;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/decode-token");
        const data = await response.json();
        if (data?.user) {
          dispatch(teamUpAction.setUserId({ id: data.user.userId }));
          checkApplicationStatus(data.user.userId);
        }
      } catch (error) {
        console.error("Error fetching logged-in user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const checkApplicationStatus = async (currentUserId: string) => {
    try {
      const response = await axios.get(`/api/get-user-data/${currentUserId}`);
      if (response.data.success) {
        const hasApplied = response.data.user.appliedTeamUp.some(
          (application: any) => application._id === teamUp._id
        );
        dispatch(
          teamUpAction.setTeamUpApplicationStatus({
            teamUpId: teamUp._id,
            isApplied: hasApplied,
          })
        );
      }
    } catch (error) {
      console.error("Error checking application status:", error);
    }
  };

  const handleApply = async (id: string) => {
    try {
      const res = await axios.patch(`/api/apply-for-teamup/${userId}`, {
        id,
      });
      if (res.data.successApply) {
        dispatch(
          teamUpAction.setTeamUpApplicationStatus({
            teamUpId: id,
            isApplied: true,
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  // //////////////////////////////////////////////////////////

  const handleCheckApplicationModal = () => {};
  return (
    <>
      <button
        onClick={() => handleCheckApplicationModal()}
        className={`bg-gradient-to-r w-1/2 from-blue-400 to-[#05f240]
         h-[40px] rounded-sm flex justify-center items-center cursor-pointer`}
      >
        <p className={`${rowdies1.className} text-white`}>Check Applications</p>
      </button>

      <a
        href={teamUp.eventOrHackathonUrl}
        className={`${
          isApplied ? "w-1/3" : "w-1/2"
        } h-[40px] bg-gradient-to-r from-blue-400 to-[#0c1feb] rounded-sm flex justify-center items-center cursor-pointer`}
      >
        <p className={`${rowdies1.className} text-white`}>More Info</p>
      </a>
      <button
        onClick={() => handleWithdraw(teamUp._id)}
        className={`
             bg-gradient-to-r w-1/3 from-blue-400 to-[#ff0d3e]
             
         h-[40px] rounded-sm flex justify-center items-center cursor-pointer`}
      >
        <p className={`${rowdies1.className} text-white`}>Delete</p>
      </button>
    </>
  );
};

export default MyTeamUpButton;
