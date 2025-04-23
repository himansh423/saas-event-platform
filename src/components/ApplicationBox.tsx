"use client";
import { applicationBoxActions } from "@/redux/ApplicationBoxSlice";
import { RootState } from "@/redux/store";
import { Rowdies } from "next/font/google";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
const ApplicationBox = () => {
  const dispatch = useDispatch();
  const { isBoxVisible } = useSelector(
    (store: RootState) => store.applicationBox
  );
  return (
    <>
      {isBoxVisible && (
        <div
          className={`w-[70vw] h-[80vh] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] rounded-lg border-zinc-400 border-[1px] bg-black flex flex-col items-center gap-6 px-5 py-5 `}
        >
          <div
            onClick={() => dispatch(applicationBoxActions.setIsBoxVisible())}
            className="absolute top-[20px] right-[20px] cursor-pointer bg-white h-10 w-10 flex items-center justify-center rounded-full"
          >
            <ImCross />
          </div>
          <p
            className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] text-center bg-clip-text text-transparent text-5xl`}
          >
            Applications
          </p>
          <div className="w-full flex-1 bg-gray-900 rounded-md px-3 py-3 flex flex-col gap-3">
            <div className="w-full h-[70px] bg-gray-950 border-[1px]  rounded-sm border-zinc-400 flex items-center justify-between px-3">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-[50px] h-[50px] bg-green-500 rounded-full"></div>
                <div className="flex flex-col">
                  <p className="text-white text-[18px]">Team Name</p>
                  <p className="text-[#D1D5DB] text-[10px]">himansh423</p>
                </div>
              </div>
              <div
                className={`flex items-center gap-2 text-white ${rowdies1.className}`}
              >
                <div className="w-[200px] h-[45px]  bg-gradient-to-br from-green-500 to-green-300 rounded-lg flex items-center justify-center border-[1px] border-black cursor-pointer">
                  <p>Approve</p>
                </div>
                <div className="w-[200px] h-[45px] bg-gradient-to-tr from-red-500 to-red-200  rounded-lg flex items-center justify-center border-[1px] border-black cursor-pointer">
                  <p>Reject</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationBox;
