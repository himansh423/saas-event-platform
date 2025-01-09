import { Rowdies } from "next/font/google";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

const ImportantQuestions = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <div className=" w-[500px] h-[90vh] border-[2px] border-[#0c1feb] bg-gray-950 rounded-lg flex flex-col items-center px-8 py-5 text-white gap-5">
        {/* <div className="UseCaseContainer w-full flex-1 flex flex-col  rounded-lg gap-3">
          <div className="text-2xl">
            <p className={`${rowdies1.className} text-center`}>
              How do you want to use this platform?
            </p>
          </div>
          <div className="w-full flex-1 flex flex-col bg-gray-900 rounded-lg px-6 py-6 gap-3">
            <div className="flex-grow  flex-col flex gap-5">
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                As Participant
              </button>
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                As Organizer
              </button>
            </div>
          </div>
        </div> */}
        {/* <div className="UseCaseContainer w-full flex-1 flex flex-col  rounded-lg gap-3">
          <div className="text-2xl">
            <p className={`${rowdies1.className} text-center`}>
              What best describes you?
            </p>
          </div>
          <div className="w-full flex-1 flex flex-col bg-gray-900 rounded-lg px-6 py-6 gap-3">
            <div className="flex-grow  flex-col flex gap-5">
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                Student
              </button>
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                Developer
              </button>
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                Event enthusiast
              </button>
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                Software Engineer
              </button>
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                Other
              </button>
            </div>
          </div>
        </div> */}
        {/* <div className="UseCaseContainer w-full flex-1 flex flex-col  rounded-lg gap-3">
          <div className="text-2xl">
            <p className={`${rowdies1.className} text-center`}>
              What best describes your Organization?
            </p>
          </div>
          <div className="w-full flex-1 flex flex-col bg-gray-900 rounded-lg px-6 py-6 gap-3">
            <div className="flex-grow  flex-col flex gap-5">
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                Agency
              </button>
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                Company
              </button>
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                Creator
              </button>
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                Influencer
              </button>
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                Other
              </button>
            </div>
          </div>
        </div> */}
        {/* <div className="UseCaseContainer w-full flex-1 flex flex-col  rounded-lg gap-3">
          <div className="text-2xl">
            <p className={`${rowdies1.className} text-center`}>
              What is the size of organization
            </p>
          </div>
          <div className="w-full flex-1 flex flex-col bg-gray-900 rounded-lg px-6 py-6 gap-3">
            <div className="flex-grow  flex-col flex gap-5">
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                1-9
              </button>
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                10-19
              </button>
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                20-29
              </button>
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                30-39
              </button>
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                {"30 < 100"}
              </button>
            </div>
          </div>
        </div> */}

        <div className="UseCaseContainer w-full flex-1 flex flex-col  rounded-lg gap-3">
          <div className="text-2xl">
            <p className={`${rowdies1.className} text-center`}>
              How do you heard about us?
            </p>
          </div>
          <div className="w-full flex-1 flex flex-col bg-gray-900 rounded-lg px-6 py-6 gap-3">
            <div className="flex-grow  flex-col flex gap-5">
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                Instagram
              </button>
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                Facebook
              </button>
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                Twitter (X)
              </button>
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                Youtube
              </button>
              <button
                className={` ${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
              >
                Linkedin
              </button>
            </div>
          </div>
        </div>

        <div className=" w-full h-[60px] flex gap-4 items-center justify-between">
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
  );
};

export default ImportantQuestions;
