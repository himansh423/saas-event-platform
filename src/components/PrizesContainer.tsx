import { Rowdies } from "next/font/google";
import { IoTrophyOutline } from "react-icons/io5";
const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
const PrizesContainer = () => {
  return (
    <div className="OverviewContainer min-h-[100vh] w-[75vw] flex flex-col px-5 py-10 gap-10">
      <div className="w-full h-[200px] bg-gradient-to-br from-[#0c1feb]/20 to-blue-500/10 border border-[#0c1feb]/20 rounded-lg px-7 py-7">
        <div className="flex items-center gap-2 text-3xl text-white">
          <div className="text-blue-700">
            <IoTrophyOutline />
          </div>
          <p className={`${rowdies1.className} `}>Prize Pool</p>
        </div>
        <p className={`${rowdies1.className} text-5xl text-white mt-6`}>
          $1,900
        </p>
        <p className="text-zinc-400 mt-[2px]">Available in Prizes</p>
      </div>
      <div className="w-full min-h-[400px] flex flex-col gap-6">
        <p
          className={`${rowdies1.className} text-4xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
        >
          Sponsor Prizes
        </p>
        <div className="w-full flex flex-col gap-5">
          <div className="w-full h-[100px] bg-gray-950 border-zinc-400 border-[1px] rounded-lg flex justify-between items-center px-7">
            <div className="flex items-center gap-3">
              <div className="bg-white h-[50px] w-[50px] rounded-md"></div>
              <div className="flex flex-col justify-center gap-0">
                <p className="font-bold text-white text-[18px]">DeFy25</p>
                <p className="text-[14px] text-zinc-400">Sponsor Prize</p>
              </div>
            </div>
            <div>
              <p className={`${rowdies1.className} text-white text-xl`}>
                $1,350
              </p>
            </div>
          </div>
          <div className="w-full h-[100px] bg-gray-950 border-zinc-400 border-[1px] rounded-lg flex justify-between items-center px-7">
            <div className="flex items-center gap-3">
              <div className="bg-white h-[50px] w-[50px] rounded-md"></div>
              <div className="flex flex-col justify-center gap-0">
                <p className="font-bold text-white text-[18px]">DPolygon</p>
                <p className="text-[14px] text-zinc-400">ETHIndia</p>
              </div>
            </div>
            <div>
              <p className={`${rowdies1.className} text-white text-xl`}>
                $1,350
              </p>
            </div>
          </div>
          <div className="w-full h-[100px] bg-gray-950 border-zinc-400 border-[1px] rounded-lg flex justify-between items-center px-7">
            <div className="flex items-center gap-3">
              <div className="bg-white h-[50px] w-[50px] rounded-md"></div>
              <div className="flex flex-col justify-center gap-0">
                <p className="font-bold text-white text-[18px]">Aptos</p>
                <p className="text-[14px] text-zinc-400">Sponsor Prize</p>
              </div>
            </div>
            <div>
              <p className={`${rowdies1.className} text-white text-xl`}>
                $1,350
              </p>
            </div>
          </div>
          
          
          <div className="w-full h-[100px] bg-gray-950 border-zinc-400 border-[1px] rounded-lg flex justify-between items-center px-7">
            <div className="flex items-center gap-3">
              <div className="bg-white h-[50px] w-[50px] rounded-md"></div>
              <div className="flex flex-col justify-center gap-0">
                <p className="font-bold text-white text-[18px]">DeFy25</p>
                <p className="text-[14px] text-zinc-400">Sponsor Prize</p>
              </div>
            </div>
            <div>
              <p className={`${rowdies1.className} text-white text-xl`}>
                $1,350
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizesContainer;
