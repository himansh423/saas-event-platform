import { Rowdies } from "next/font/google";
import Link from "next/link";
import { PiShareFatDuotone } from "react-icons/pi";
import { RiTwitterXFill } from "react-icons/ri";
const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
const EventCard = () => {
  return (
    <div>
      <div className="w-[400px] h-[500px] text-white  bg-black border border-zinc-800 rounded-2xl p-6 flex flex-col shadow-[0_0_0_2px_#0c1feb]  hover:shadow-[0_0_0_4px_#0c1feb] transition-transform">
        <p
          className={`${rowdies1.className} text-2xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent mb-3`}
        >
          Reclaim Opensource Hack Week
        </p>
        <p className="text-gray-400">Reclaim Your Data Ownership</p>
        <div className="flex flex-col gap-3 mt-5">
          <div className="flex gap-2 items-center ">
            <div className=" bg-gradient-to-r rounded-full text-[#0c1feb] from-blue-400 to-[#0c1feb] h-[6px] w-[6px] mt-[2px]" />
            <p className={`text-gray-300`}>12 Nov - 21 Oct, 2025</p>
          </div>
          <div className="flex gap-2 items-center ">
            <div className=" bg-gradient-to-r rounded-full text-[#0c1feb] from-blue-400 to-[#0c1feb] h-[6px] w-[6px] mt-[2px]" />
            <p className={`text-gray-300`}>Offline</p>
          </div>
          <div className="flex  mt-5  text-white justify-between items-center">
            <div className="flex gap-4   text-2xl">
              <div className="bg-gray-900 rounded-full p-3">
                <RiTwitterXFill />
              </div>
              <div className="bg-gray-900 rounded-full p-3">
                <PiShareFatDuotone />
              </div>
            </div>
            <div className="w-fit h-[40px] px-7 flex justify-center items-center bg-white  rounded-md bg-gradient-to-l from-blue-500 to-[#0c1feb] text-white">
              <p className={`${rowdies1.className}`}>OPEN</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p
              className={`${rowdies1.className} font-bold text-gray-400 text-[10px]`}
            >
              THEME
            </p>
            <div className="w-full h-[70px] p-2 flex flex-wrap gap-2 bg-gray-900 rounded-lg">
              <div className="px-[4px] h-[30px] bg-gradient-to-r from-blue-500 to-[#0c1feb] flex justify-center items-center text-[12px] rounded-lg text-[#e4e0e0]">
                <p className={rowdies1.className}>BLOCKCHAIN</p>
              </div>
              <div className="px-[4px] h-[30px] bg-gradient-to-r from-blue-500 to-[#0c1feb] flex justify-center items-center text-[12px] rounded-lg text-[#e4e0e0]">
                <p className={rowdies1.className}>AI/ML</p>
              </div>
              <div className="px-[4px] h-[30px] bg-gradient-to-r from-blue-500 to-[#0c1feb] flex justify-center items-center text-[12px] rounded-lg text-[#e4e0e0]">
                <p className={rowdies1.className}>NODE</p>
              </div>
            </div>
          </div>
          <Link
            href={"/overview/1"}
            className="w-full h-[60px] flex items-center justify-center bg-gradient-to-r from-blue-500 to-[#0c1feb] mt-3 rounded-lg hover:bg-gradient-to-l"
          >
            <p className={`${rowdies1.className}`}>Apply Now</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
