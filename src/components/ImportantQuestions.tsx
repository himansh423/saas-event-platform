"use client";
import { importantQuestionsAction } from "@/redux/importantQuestionsSlice";
import { RootState } from "@/redux/store";
import { Check } from "lucide-react";
import { Rowdies } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

const ImportantQuestions = () => {
  const { currTab, tabOneAnswer, tabTwoAnswer } = useSelector(
    (store: RootState) => store.importantQuestion
  );
  const dispatch = useDispatch();

  const handleTabChange = (tab: number) => {
    dispatch(importantQuestionsAction.setTab({ data: tab }));
  };

  const handleTabOneAnswer = (optionNumber: number, value: string) => {
    dispatch(
      importantQuestionsAction.setTabOneAnswer({
        data: { optionNumber, value },
      })
    );
  };
  const handleTabTwoAnswer = (optionNumber: number, value: string) => {
    dispatch(
      importantQuestionsAction.setTabTwoAnswer({
        data: { optionNumber, value },
      })
    );
  };
  const handleTabThreeAnswer = (optionNumber: number, value: string) => {
    dispatch(
      importantQuestionsAction.setTabTwoAnswer({
        data: { optionNumber, value },
      })
    );
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <div className="w-[500px] h-[90vh] border-[2px] border-[#0c1feb] bg-gray-950 rounded-lg flex flex-col items-center px-8 py-5 text-white gap-5">
        {/* Tab 1 */}
        {currTab === 1 && (
          <div className="UseCaseContainer w-full flex-1 flex flex-col rounded-lg gap-3">
            <div className="text-2xl">
              <p className={`${rowdies1.className} text-center`}>
                How do you want to use this platform?
              </p>
            </div>
            <div className="w-full flex-1 flex flex-col bg-gray-900 rounded-lg px-6 py-6 gap-3">
              <div className="flex-grow flex-col flex gap-5">
                <div className="relative">
                  <button
                    onClick={() =>
                      handleTabOneAnswer(1, "Want to Team Up for Hackathon")
                    }
                    className={`${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
                  >
                    Want to Team Up for Hackathon
                  </button>
                  {tabOneAnswer.optionNumber === 1 && (
                    <div className="text-2xl text-white rounded-full absolute top-[50%] translate-y-[-50%] right-[20px] h-[30px] w-[30px] flex items-center justify-center bg-green-500">
                      <Check />
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={() =>
                      handleTabOneAnswer(2, "News and Insights About Events")
                    }
                    className={`${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
                  >
                    News and Insights About Events
                  </button>
                  {tabOneAnswer.optionNumber === 2 && (
                    <div className="text-2xl text-white rounded-full absolute top-[50%] translate-y-[-50%] right-[20px] h-[30px] w-[30px] flex items-center justify-center bg-green-500">
                      <Check />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2 */}
        {currTab === 2 && (
          <div className="UseCaseContainer w-full flex-1 flex flex-col rounded-lg gap-3">
            <div className="text-2xl">
              <p className={`${rowdies1.className} text-center`}>
                What best describes you?
              </p>
            </div>
            <div className="w-full flex-1 flex flex-col bg-gray-900 rounded-lg px-6 py-6 gap-3">
              <div className="flex-grow flex-col flex gap-5">
                {[
                  { value: "Student", optionNumber: 1 },
                  { value: "Developer", optionNumber: 2 },
                  { value: "Event Enthusiast", optionNumber: 3 },
                  { value: "Software Engineer", optionNumber: 4 },
                  { value: "Other", optionNumber: 5 },
                ].map((option) => (
                  <div className="relative">
                    <button
                      onClick={() =>
                        handleTabTwoAnswer(option.optionNumber, option.value)
                      }
                      key={option.optionNumber}
                      className={`${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
                    >
                      {option.value}
                    </button>
                    {tabTwoAnswer.optionNumber === option.optionNumber && (
                      <div className="text-2xl text-white rounded-full absolute top-[50%] translate-y-[-50%] right-[20px] h-[30px] w-[30px] flex items-center justify-center bg-green-500">
                        <Check />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3 */}
        {currTab === 3 && (
          <div className="UseCaseContainer w-full flex-1 flex flex-col rounded-lg gap-3">
            <div className="text-2xl">
              <p className={`${rowdies1.className} text-center`}>
                How did you hear about us?
              </p>
            </div>
            <div className="w-full flex-1 flex flex-col bg-gray-900 rounded-lg px-6 py-6 gap-3">
              <div className="flex-grow flex-col flex gap-5">
                {[
                  "Instagram",
                  "Facebook",
                  "Twitter (X)",
                  "YouTube",
                  "LinkedIn",
                ].map((option) => (
                  <button
                    key={option}
                    className={`${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="w-full h-[60px] flex gap-4 items-center justify-between">
          <button
            disabled={currTab === 1}
            onClick={() => handleTabChange(currTab - 1)}
            className={`${rowdies1.className} bg-[#111111] rounded-md border-[1px] border-[#0c1feb] h-full w-[190px] text-2xl disabled:opacity-50`}
          >
            Back
          </button>
          <button
            onClick={() => handleTabChange(currTab + 1)}
            className={`${rowdies1.className} bg-[#111111] rounded-md border-[1px] border-[#0c1feb] h-full w-[190px] text-2xl`}
          >
            {currTab === 3 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportantQuestions;
