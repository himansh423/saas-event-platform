"use client";
import axios from "axios";
import { Rowdies } from "next/font/google";
import { useEffect, useState } from "react";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

const ApplyButton = ({ teamUp }: { teamUp: any }) => {
  const [userId, setUserId] = useState<string>("");
  const [applied, setApplied] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/decode-token");
        const data = await response.json();
        if (data?.user) {
          setUserId(data.user.userId);
          
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
        setApplied(hasApplied);
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
        setApplied(true);
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
        setApplied(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        disabled={applied}
        onClick={() => handleApply(teamUp._id)}
        className={`${
          applied
            ? "bg-gradient-to-r w-1/3 from-blue-400 to-[#05f240]"
            : "bg-gradient-to-r w-1/2 from-blue-400 to-[#0c1feb]"
        } h-[40px] rounded-sm flex justify-center items-center cursor-pointer`}
      >
        <p className={`${rowdies1.className} text-white`}>
          {applied ? "Applied" : "Apply for Teamup"}
        </p>
      </button>
      <button
        onClick={() => handleWithdraw(teamUp._id)}
        className={`${
          applied
            ? "bg-gradient-to-r w-1/3 from-blue-400 to-[#ff0d3e]"
            : "bg-gradient-to-r w-1/2 from-blue-400 to-[#0c1feb] hidden"
        } h-[40px] rounded-sm flex justify-center items-center cursor-pointer`}
      >
        <p className={`${rowdies1.className} text-white`}>Withdraw</p>
      </button>
      <a
        href={teamUp.eventOrHackathonUrl}
        className={`${
          applied ? "w-1/3" : "w-1/2"
        } h-[40px] bg-gradient-to-r from-blue-400 to-[#0c1feb] rounded-sm flex justify-center items-center cursor-pointer`}
      >
        <p className={`${rowdies1.className} text-white`}>More Info</p>
      </a>
    </>
  );
};

export default ApplyButton;
