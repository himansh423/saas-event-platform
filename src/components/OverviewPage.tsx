import Image from "next/image";
import banner from "../../public/hackathonImage.webp";
import { Rowdies } from "next/font/google";
import { MdDateRange, MdGroups, MdLocationPin } from "react-icons/md";
import { IoTrophyOutline } from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { Instagram, Twitter, X } from "lucide-react";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
const OverviewPage = () => {
  return (
    <div className="w-screen min-h-screen bg-black relative">
      <div className="HeroSection w-full h-[450px] flex items-end">
        <div className="w-1/2 h-full flex flex-col gap-2 justify-between  p-7">
          <div className="w-full h-[120px] bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="w-[100px] h-[90px] bg-white">logo</div>
          </div>
          <div className="w-full  bg-gray-900 rounded-lg p-4">
            <div className="w-full flex flex-col gap-2 mb-7">
              <p
                className={`${rowdies1.className}  text-4xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
              >
                Reclaim Opensource Hack Week
              </p>
              <p className="text-zinc-400 text-xl">
                Reclaim Your Data Ownership
              </p>
            </div>
            <div className="w-full flex items-center gap-5">
              <div className="flex gap-1 items-center">
                <div className="text-xl text-blue-700">
                  <MdDateRange />
                </div>
                <p className="text-zinc-400">12 Nov - 21 Oct, 2025</p>
              </div>
              <div className="flex gap-1 items-center">
                <div className="text-xl text-blue-700">
                  <MdLocationPin />
                </div>
                <p className="text-zinc-400">New Delhi, India</p>
              </div>
              <div className="flex gap-1 items-center">
                <div className="text-xl text-blue-700">
                  <IoTrophyOutline />
                </div>
                <p className="text-zinc-400">$1999</p>
              </div>
            </div>
            <div className="w-full flex items-center mt-5 gap-1">
              <div className="text-blue-700 text-xl mt-[2px]">
                <LuClock />
              </div>
              <p className="text-zinc-400">Applications close in 2d:12h:57m</p>
            </div>
            <div className="w-full flex items-center mt-5 gap-1">
              <div className="text-blue-700 text-xl mt-[2px]">
                <MdGroups />
              </div>
              <p className="text-zinc-400">Team size: 3-5</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full p-7">
          <div className="w-full h-full  relative overflow-hidden rounded-lg">
            <Image
              src={banner.src}
              alt="banner"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      <div className="OptionNav sticky top-0 z-10 bg-black border-b border-zinc-800 w-full h-[60px] px-14 flex items-end gap-10">
        <div className="border-b-[3px] border-blue-700 h-[40px] w-fit text-blue-700 text-2xl">
          <p className={rowdies1.className}>Overview</p>
        </div>
        <div className="w-fit text-2xl text-zinc-400 h-[40px]">
          <p className={rowdies1.className}>Prizes</p>
        </div>
        <div className="w-fit text-2xl text-zinc-400 h-[40px]">
          <p className={rowdies1.className}>Schedule</p>
        </div>
      </div>
      <div className="w-screen min-h-screen flex">
        <div className="h-[100vh] w-[75vw] bg-white"></div>
        <div className="min-h-screen flex-1  px-4 py-5 flex flex-col items-center gap-7 pr-7 bg-black">
          <div className="w-full h-[200px] bg-black border-[1px] rounded-xl border-zinc-400 text-zinc-400 p-5 flex flex-col justify-between">
            <div>
              <p className="mb-2">APPLICATIONS CLOSE IN</p>
              <p
                className={`${rowdies1.className} text-4xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent `}
              >
                2d:12h:57m
              </p>
            </div>
            <div className="w-full h-[70px] bg-gradient-to-t hover:bg-gradient-to-l from-blue-400 to-[#0c1feb] rounded-md text-white flex items-center justify-center">
              <p className={`${rowdies1.className} text-xl`}>Apply Now</p>
            </div>
          </div>
          <div className="w-full h-[200px] bg-black border-[1px] rounded-xl border-zinc-400 text-zinc-400 p-5 flex flex-col justify-evenly gap-2">
            <div>
              <p>RUNS FROM</p>
              <p
                className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent `}
              >
                Jan 10 - 11, 2025
              </p>
            </div>
            <div>
              <p>HAPPENING</p>
              <p
                className={`${rowdies1.className}  bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent `}
              >
                DELHI, INDIA
              </p>
            </div>
            <div className="w-full flex items-center text-zinc-400 gap-4">
              <div className="hover:text-white">
                <Instagram />
              </div>
              <div className="hover:text-white">
                <Twitter />
              </div>
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
