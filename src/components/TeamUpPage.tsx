import { Rowdies } from "next/font/google";
import TeamUpCard from "./TeamUpCard";
import axios from "axios";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
interface TeamUp {
  _id: string;
  hackName: string;
  createdBy: {
    firstName: string;
    lastName: string;
  };

  description: string;
  location: string;
  email: string;
  mobileNumber: string;
  dateStart: Date;
  dateEnd: Date;
  eventOrHackathonUrl: string;
}
const getTeamUpData = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/get-teamup");
    if (res.data.success) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error)
    return [];
  }
};
const TeamUpPage = async () => {
  const teamUpData = await getTeamUpData();
  return (
    <div className="w-screen min-h-screen">
      <div className="w-full flex flex-col gap-4 items-center pt-10">
        <h1
          className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent text-7xl`}
        >
          Team Up Opportunities
        </h1>
      </div>
      <div className="w-full px-6 grid grid-cols-3 place-items-center py-20">
        {teamUpData.map((teamUp: TeamUp) => (
          <TeamUpCard teamUp={teamUp} key={teamUp._id} />
        ))}
      </div>
    </div>
  );
};

export default TeamUpPage;
