"use client";
import Image from "next/image";
import { Rowdies } from "next/font/google";
import { MdDateRange, MdGroups, MdLocationPin } from "react-icons/md";
import { IoTrophyOutline } from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { Instagram, Twitter } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { overviewAction } from "@/redux/overviewSlice";
import { useParams } from "next/navigation";
import { RootState } from "@/redux/store";
import Link from "next/link";
import {
  calculateTimeRemaining,
  formatEventDate,
} from "@/utils/dateFormatters";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

const OverviewPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [timeRemaining, setTimeRemaining] = useState({
    timeString: "",
    isExpired: false,
  });

  const { overviewData } = useSelector((store: RootState) => store.overview);

  useEffect(() => {
    const getEventOrHackathonDetails = async () => {
      try {
        const res = await axios.get(
          `/api/get-event-from-database-with-image/${id}`
        );

        if (res.data) {
          dispatch(overviewAction.setOverviewData({ data: res.data }));
        }
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    };
    getEventOrHackathonDetails();
  }, []);

  useEffect(() => {
    if (overviewData?.applicationCloseDate) {
      // Initial calculation
      setTimeRemaining(
        calculateTimeRemaining(overviewData.applicationCloseDate)
      );

      // Update every minute
      const timer = setInterval(() => {
        setTimeRemaining(
          calculateTimeRemaining(overviewData.applicationCloseDate)
        );
      }, 60000);

      return () => clearInterval(timer);
    }
  }, [overviewData?.applicationCloseDate]);

  const formattedDate = overviewData
    ? formatEventDate(overviewData.dateStart, overviewData.dateEnd)
    : "";

  return (
    <div className="w-screen min-h-screen bg-black relative">
      <div className="HeroSection w-full h-[450px] flex items-end">
        <div className="w-1/2 h-full flex flex-col gap-2 justify-between p-7">
          <div className="w-full h-[120px] bg-gray-950 border-[1px] border-zinc-400 rounded-lg flex items-center justify-center">
            <div className="w-[100px] h-[90px] bg-white relative">
              <Image
                src={overviewData?.logo as string}
                alt="logo"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="w-full bg-gray-950 border-[1px] border-zinc-400 rounded-lg p-4">
            <div className="w-full flex flex-col gap-2 mb-7">
              <p
                className={`${rowdies1.className} text-4xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
              >
                {overviewData?.name}
              </p>
              <p className="text-zinc-400 text-xl">
                {overviewData?.shortDescription}
              </p>
            </div>
            <div className="w-full flex items-center gap-5">
              <div className="flex gap-1 items-center">
                <div className="text-xl text-blue-700">
                  <MdDateRange />
                </div>
                <p className="text-zinc-400">{formattedDate}</p>
              </div>
              <div className="flex gap-1 items-center">
                <div className="text-xl text-blue-700">
                  <MdLocationPin />
                </div>
                <p className="text-zinc-400">{overviewData?.location}</p>
              </div>
              <div className="flex gap-1 items-center">
                <div className="text-xl text-blue-700">
                  <IoTrophyOutline />
                </div>
                <p className="text-zinc-400">{overviewData?.prize}</p>
              </div>
            </div>
            <div className="w-full flex items-center mt-5 gap-1">
              <div className="text-blue-700 text-xl mt-[2px]">
                <LuClock />
              </div>
              <p className="text-zinc-400">
                {timeRemaining.isExpired
                  ? "Applications Closed"
                  : `Applications close in ${timeRemaining.timeString}`}
              </p>
            </div>
            <div className="w-full flex items-center mt-5 gap-1">
              <div className="text-blue-700 text-xl mt-[2px]">
                <MdGroups />
              </div>
              <p className="text-zinc-400">{overviewData?.teamSize}</p>
            </div>
          </div>
        </div>
        {/* Rest of your component remains the same until the timer section */}
        <div className="w-1/2 h-full p-7">
          <div className="w-full h-full relative overflow-hidden rounded-lg border border-zinc-400">
            <Image
              src={overviewData?.eventPoster as string}
              alt="banner"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      {/* The timer section in the sidebar */}
      <div className="OptionNav sticky top-0 z-10 bg-black border-b border-zinc-800 w-full h-[60px] flex items-end gap-10 px-7">
        <div className="text-blue-700 border-blue-700 border-b-[3px] h-[40px] w-fit text-2xl cursor-pointer">
          <p className={rowdies1.className}>Overview</p>
        </div>
      </div>
      <div className="w-screen min-h-screen flex">
        <div>
          <div className="OverviewContainer w-[75vw] flex flex-col px-5 py-10 gap-10">
            <div className="w-full min-h-[400px] bg-gradient-to-br from-[#0c1feb]/20 to-blue-500/10 border border-[#0c1feb]/20 rounded-lg px-5 py-4 pb-6 flex flex-col gap-4">
              <p
                className={`${rowdies1.className} text-4xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
              >
                About the Hackathon
              </p>
              <p className="text-white text-xl">
                {overviewData?.aboutDescriptions}
              </p>
            </div>
          </div>
          <div className="OverviewContainer w-[75vw] flex flex-col px-5 py-10 gap-10">
            <div className="w-full h-[200px] bg-gradient-to-br from-[#0c1feb]/20 to-blue-500/10 border border-[#0c1feb]/20 rounded-lg px-7 py-7">
              <div className="flex items-center gap-2 text-3xl text-white">
                <div className="text-blue-700">
                  <IoTrophyOutline />
                </div>
                <p className={`${rowdies1.className}`}>Prize Pool</p>
              </div>
              <p className={`${rowdies1.className} text-5xl text-white mt-6`}>
                {overviewData?.prize}
              </p>
              <p className="text-zinc-400 mt-[4px]">Available in Prizes</p>
            </div>
          </div>
        </div>
        <div className="min-h-screen flex-1 px-4 py-10 flex flex-col items-center gap-7 pr-7 bg-black">
          <div className="w-full h-[200px] bg-black border-[1px] rounded-xl border-zinc-400 text-zinc-400 p-5 flex flex-col justify-between">
            <div>
              <p className="mb-2">APPLICATIONS CLOSE IN</p>
              <p
                className={`${rowdies1.className} text-4xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
              >
                {timeRemaining.timeString}
              </p>
            </div>
            <Link
              href={overviewData?.eventOrHackathonUrl as string}
              className="w-full h-[70px] bg-gradient-to-t hover:bg-gradient-to-l from-blue-400 to-[#0c1feb] rounded-md text-white flex items-center justify-center"
            >
              <p className={`${rowdies1.className} text-xl`}>
                {timeRemaining.isExpired ? "Event Closed" : "Apply Now"}
              </p>
            </Link>
          </div>
          <div className="w-full h-[200px] bg-black border-[1px] rounded-xl border-zinc-400 text-zinc-400 p-5 flex flex-col justify-evenly gap-2">
            <div>
              <p>RUNS FROM</p>
              <p
                className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
              >
                {formattedDate}
              </p>
            </div>
            <div>
              <p>HAPPENING</p>
              <p
                className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
              >
                {overviewData?.location}
              </p>
            </div>
            <div className="w-full flex items-center text-zinc-400 gap-4">
              <Link
                href={overviewData?.instagramLink as string}
                className="hover:text-white"
              >
                <Instagram />
              </Link>
              <Link
                href={overviewData?.twitterLink as string}
                className="hover:text-white"
              >
                <Twitter />
              </Link>
            </div>
          </div>
          <div className="w-full  bg-black border-[1px] rounded-xl border-zinc-400  p-5 flex flex-col justify-between">
            <p className={`${rowdies1.className} text-[20px] text-white mb-2`}>
              More Hackathons & Events
            </p>
            <div className="w-full flex flex-col gap-3">
              <div className="w-full h-[80px] bg-gray-900 px-4 py-4 rounded-md gap-3 flex items-center">
                <div className="w-[48px] h-full bg-white rounded-sm"></div>
                <div className="flex flex-col ">
                  <p className="text-white text-[17px] font-semibold">
                    HackHound 3.0
                  </p>
                  <p className="text-zinc-400 text-[14px]">Starts 27/02/2</p>
                </div>
              </div>
              <div className="w-full h-[80px] bg-gray-900 px-4 py-4 rounded-md gap-3 flex items-center">
                <div className="w-[48px] h-full bg-white rounded-sm"></div>
                <div className="flex flex-col ">
                  <p className="text-white text-[17px] font-semibold">
                    HackHound 3.0
                  </p>
                  <p className="text-zinc-400 text-[14px]">Starts 27/02/2</p>
                </div>
              </div>
              <div className="w-full h-[80px] bg-gray-900 px-4 py-4 rounded-md gap-3 flex items-center">
                <div className="w-[48px] h-full bg-white rounded-sm"></div>
                <div className="flex flex-col ">
                  <p className="text-white text-[17px] font-semibold">
                    HackHound 3.0
                  </p>
                  <p className="text-zinc-400 text-[14px]">Starts 27/02/2</p>
                </div>
              </div>
              <div className="w-full h-[80px] bg-gray-900 px-4 py-4 rounded-md gap-3 flex items-center">
                <div className="w-[48px] h-full bg-white rounded-sm"></div>
                <div className="flex flex-col ">
                  <p className="text-white text-[17px] font-semibold">
                    HackHound 3.0
                  </p>
                  <p className="text-zinc-400 text-[14px]">Starts 27/02/2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
