"use client";
import { overviewPageActions } from "@/redux/overviewPageSlice";
import { RootState } from "@/redux/store";
import { Rowdies } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
const OptionNav = () => {
  const dispatch = useDispatch();
  const {tab} = useSelector((store:RootState) => store.overviewTab)
  const handleTab = (tab: string) => {
    dispatch(
      overviewPageActions.setTab(tab as "overview" | "prizes" | "schedule")
    );
  };
  return (
    
      <div className="OptionNav sticky top-0 z-10 bg-black border-b border-zinc-800 w-full h-[60px]  flex items-end gap-10 px-7">
        <div
          onClick={() => handleTab("overview")}
          className={`${tab === "overview"? 'text-blue-700 border-blue-700 border-b-[3px]':'text-zinc-400' }   h-[40px] w-fit  text-2xl cursor-pointer`}
        >
          <p className={rowdies1.className}>Overview</p>
        </div>
        <div
          onClick={() => handleTab("prizes")}
          className={`${tab === "prizes"?'text-blue-700 border-blue-700 border-b-[3px]':'text-zinc-400' } w-fit text-2xl h-[40px] cursor-pointer`}
        >
          <p className={rowdies1.className}>Prizes</p>
        </div>
       
      </div>
   
  );
};

export default OptionNav;
