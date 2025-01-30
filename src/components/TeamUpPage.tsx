import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import { Rowdies } from "next/font/google";
import TeamUpCard from "./TeamUpCard";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
const TeamUpPage = () => {
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
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <TeamUpCard />
        ))}
      </div>
    </div>
  );
};

export default TeamUpPage;
