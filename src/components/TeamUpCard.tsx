import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import { Rowdies } from "next/font/google";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
const TeamUpCard = () => {
  return (
    <>
      <div className="w-[467px] h-[367px] bg-[#111111] rounded-md border-[1px] border-[#222] flex flex-col items-start mb-12 justify-between px-4 py-5">
        <div className="flex flex-col gap-1">
          <p
            className={`${rowdies1.className} text-2xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
          >
            Delhi Tech Summit Hackathon 2024
          </p>
          <p className="text-[14px] text-[#A3A3A3]">
            Posted by Himanshu Chauhan
          </p>
        </div>
        <div className="text-[#D1D5DB] text-[14px]">
          <p>
            Looking for team members skilled in full-stack development and UI/UX
            design for a 24-hour hackathon focused on AI/ML solutions.
          </p>
        </div>
        <div className="flex  flex-col gap-2">
          <div className="flex gap-1 items-center text-[14px] text-[#9CA3AF]">
            <div>
              <Calendar className="h-4 w-4" />
            </div>
            <p>15-16 February 2024</p>
          </div>
          <div className="flex gap-1 items-center text-[14px] text-[#9CA3AF]">
            <div>
              <MapPin className="h-4 w-4" />
            </div>
            <p>New Delhi, India</p>
          </div>
          <div className="flex gap-1 items-center text-[14px] text-[#9CA3AF]">
            <div>
              <Mail className="h-4 w-4" />
            </div>
            <p>himanshuchau423@gmail.com</p>
          </div>
          <div className="flex gap-1 items-center text-[14px] text-[#9CA3AF]">
            <div>
              <Phone className="h-4 w-4" />
            </div>
            <p>+91-8287015235</p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full gap-5">
          <div className="w-1/2 h-[40px] bg-gradient-to-r from-blue-400 to-[#0c1feb] rounded-sm flex justify-center items-center">
            <p className={`${rowdies1.className} text-white`}>
              Apply for Team Up
            </p>
          </div>
          <div className="w-1/2 h-[40px] bg-gradient-to-r from-blue-400 to-[#0c1feb] rounded-sm flex justify-center items-center">
            <p className={`${rowdies1.className} text-white`}>More Info</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamUpCard;
