import { Rowdies, Shadows_Into_Light } from "next/font/google";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

const ImportantQuestions = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <div className="UseCaseContainer w-[500px] h-[90vh] border-[2px] border-[#0c1feb] bg-gray-950 rounded-lg flex flex-col items-center px-8 py-5 text-white gap-5">
        <div className="text-2xl">
          <p className={`${rowdies1.className} text-center`}>
            How do you want to use this platform?
          </p>
        </div>
        <div className="w-full flex-1 flex flex-col bg-gray-900 rounded-lg px-6 py-6 gap-3">
          <div className="flex-grow  flex-col flex gap-5">
            <button className="w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md">
              As Participant
            </button>
            <button className="w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md">
              As Participant
            </button>
          </div>
          <div className="w-full h-[60px] flex gap-4 items-center justify-between">
            <button
              className={`${rowdies1.className} bg-[#111111] rounded-md border-[1px] border-[#0c1feb] h-full w-[190px] text-2xl`}
            >
              Back
            </button>
            <button
              className={`${rowdies1.className} bg-[#111111] rounded-md border-[1px] border-[#0c1feb] h-full w-[190px] text-2xl`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportantQuestions;
