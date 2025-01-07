import Image from "next/image";
import banner from "../../public/hackathonImage.webp";
import { Rowdies } from "next/font/google";
import { MdDateRange, MdGroups, MdLocationPin } from "react-icons/md";
import { Clock, Trophy } from "lucide-react";
import { IoTrophyOutline } from "react-icons/io5";
import { LuClock } from "react-icons/lu";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
const OverviewPage = () => {
  return (
    <div className="w-screen min-h-screen bg-black">
      <div className="w-full h-[450px] flex items-end">
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
    </div>
  );
};

export default OverviewPage;
