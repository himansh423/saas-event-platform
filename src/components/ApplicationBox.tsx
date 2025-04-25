"use client";
import { Rowdies } from "next/font/google";
import Image from "next/image";
import { ImCross } from "react-icons/im";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

interface AppliedBy {
  firstName: string;
  lastName: string;
  username: string;
  profilePicture: string;
}

interface MyTeamUp {
  _id: string;
  hackName: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  location: string;
  email: string;
  mobileNumber: string;
  appliedBy: AppliedBy[];
  eventOrHackathonUrl: string;
}

interface ApplicationBoxProps {
  myTeamUp: MyTeamUp;
  isVisible: boolean;
  onClose: () => void;
}

const ApplicationBox = ({
  myTeamUp,
  isVisible,
  onClose,
}: ApplicationBoxProps) => {
  const handleApproval = (
    username: string,
    TeamUpId: string,
    descision: string
  ) => {
    if (descision === "approve") {
      console.log("Approved", username, TeamUpId);
      console.log("teamup => ", myTeamUp);
    } else {
      console.log("Rejected", username, TeamUpId);
    }
  };
  return (
    <>
      {isVisible && (
        <div
          className={`w-[70vw] h-[80vh] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] rounded-lg border-zinc-400 border-[1px] bg-black flex flex-col items-center gap-6 px-5 py-5 z-50`}
        >
          <div
            onClick={onClose}
            className="absolute top-[20px] right-[20px] cursor-pointer bg-white h-10 w-10 flex items-center justify-center rounded-full"
          >
            <ImCross />
          </div>
          <p
            className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] text-center bg-clip-text text-transparent text-5xl`}
          >
            Applications for {myTeamUp.hackName}
          </p>
          <div className="w-full flex-1 bg-gray-900 rounded-md px-3 py-3 flex flex-col gap-3 overflow-y-auto">
            {!myTeamUp.appliedBy || myTeamUp.appliedBy.length === 0 ? (
              <p className="text-white text-center">
                No applications yet for this team-up.
              </p>
            ) : (
              myTeamUp.appliedBy.map((appliedBy) => (
                <div
                  key={appliedBy.username}
                  className="w-full h-[70px] bg-gray-950 border-[1px] rounded-sm border-zinc-400 flex items-center justify-between px-3"
                >
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-[50px] h-[50px] bg-green-500 rounded-full relative overflow-hidden">
                      <Image
                        src={appliedBy.profilePicture}
                        alt="Profile Picture"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-white text-[18px]">
                        {appliedBy.firstName} {appliedBy.lastName}
                      </p>
                      <p className="text-[#D1D5DB] text-[10px]">
                        {appliedBy.username}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-2 text-white ${rowdies1.className}`}
                  >
                    <button
                      onClick={() =>
                        handleApproval(
                          appliedBy.username,
                          myTeamUp._id,
                          "approve"
                        )
                      }
                      className="w-[200px] h-[45px] bg-gradient-to-br from-green-500 to-green-300 rounded-lg flex items-center justify-center border-[1px] border-black cursor-pointer"
                    >
                      <p>Approve</p>
                    </button>
                    <div className="w-[200px] h-[45px] bg-gradient-to-tr from-red-500 to-red-200 rounded-lg flex items-center justify-center border-[1px] border-black cursor-pointer">
                      <p>Reject</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationBox;
