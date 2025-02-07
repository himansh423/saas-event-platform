"use client";
import { importantQuestionsAction } from "@/redux/importantQuestionsSlice";
import { RootState } from "@/redux/store";
import { Check } from "lucide-react";
import { Rowdies } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userAction } from "@/redux/userSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

const ImportantQuestions = () => {
  const { currTab, tabOneAnswer, tabTwoAnswer, tabThreeAnswer } = useSelector(
    (store: RootState) => store.importantQuestion
  );
  const { loggedInUser } = useSelector((store: RootState) => store.user);
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
      importantQuestionsAction.setTabThreeAnswer({
        data: { optionNumber, value },
      })
    );
  };

  // Disable Next button if no option is selected in the current tab
  const isNextDisabled =
    (currTab === 1 && !tabOneAnswer.optionNumber) ||
    (currTab === 2 && !tabTwoAnswer.optionNumber) ||
    (currTab === 3 && !tabThreeAnswer.optionNumber);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/decode-token");
        const data = await response.json();
        if (data?.user) {
          dispatch(userAction.setLoggedInUser({ data: data.user }));
        }
      } catch (error) {
        console.error("Error fetching logged-in user data:", error);
      }
    };

    fetchUserData();
  }, []);
  const router = useRouter();
  const handleSaveAnswersToDatabase = async () => {
    try {
      const payload = {
        questions: {
          how_do_you_want_to_use_this_platform: tabOneAnswer.value,
          what_best_describes_you: tabTwoAnswer.value,
          how_do_you_heard_about_us: tabThreeAnswer.value,
        },
      };
      const res = await axios.patch(
        `/api/save-answers/${loggedInUser?.userId}`,
        payload
      );
      if (res.data.success) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
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
                {[
                  { value: "Want to Team Up for Hackathon", optionNumber: 1 },
                  { value: "News and Insights About Events", optionNumber: 2 },
                ].map((option) => (
                  <div key={option.optionNumber} className="relative">
                    <button
                      onClick={() =>
                        handleTabOneAnswer(option.optionNumber, option.value)
                      }
                      className={`${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
                    >
                      {option.value}
                    </button>
                    {tabOneAnswer.optionNumber === option.optionNumber && (
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
                  <div key={option.optionNumber} className="relative">
                    <button
                      onClick={() =>
                        handleTabTwoAnswer(option.optionNumber, option.value)
                      }
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
                  { value: "Instagram", optionNumber: 1 },
                  { value: "Facebook", optionNumber: 2 },
                  { value: "Twitter (X)", optionNumber: 3 },
                  { value: "YouTube", optionNumber: 4 },
                  { value: "LinkedIn", optionNumber: 5 },
                ].map((option) => (
                  <div key={option.optionNumber} className="relative">
                    <button
                      onClick={() =>
                        handleTabThreeAnswer(option.optionNumber, option.value)
                      }
                      className={`${rowdies1.className} w-full h-[70px] bg-black border-[1px] border-[#0c1feb] rounded-md font-bold`}
                    >
                      {option.value}
                    </button>
                    {tabThreeAnswer.optionNumber === option.optionNumber && (
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

        <div className="w-full h-[60px] flex gap-4 items-center justify-between">
          <button
            disabled={currTab === 1}
            onClick={() => handleTabChange(currTab - 1)}
            className={`${rowdies1.className} bg-[#111111] rounded-md border-[1px] border-[#0c1feb] h-full w-[190px] text-2xl disabled:opacity-50`}
          >
            Back
          </button>

          {currTab === 3 ? (
            <div
              onClick={handleSaveAnswersToDatabase}
              className={`${rowdies1.className} bg-[#111111] rounded-md border-[1px] border-[#0c1feb] h-full w-[190px] text-2xl flex items-center justify-center`}
            >
              Finish
            </div>
          ) : (
            <button
              onClick={() => handleTabChange(currTab + 1)}
              disabled={isNextDisabled}
              className={`${rowdies1.className} bg-[#111111] rounded-md border-[1px] border-[#0c1feb] h-full w-[190px] text-2xl disabled:opacity-50`}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportantQuestions;
