import { Rowdies } from "next/font/google";
import TeamUpCard from "./TeamUpCard";
import axios from "axios";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

const getTeamUpData = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/get-teamup");
    if (res.data.success) {
      return res.data.data;
    }
  } catch (error) {
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
        {teamUpData.map((teamUp:any) => (
          <TeamUpCard teamUp={teamUp} />
        ))}
      </div>
    </div>
  );
};

export default TeamUpPage;
