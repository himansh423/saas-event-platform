import { Rowdies } from "next/font/google";
import TeamUpCard from "./TeamUpCard";
import axios from "axios";
import { cookies } from "next/headers";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

interface AppliedTeamUp {
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
const fetchUserDataFromCookie = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/decode-token",
        {
          headers: { Cookie: `token=${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      if (data?.user) {
        return data.user;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
};
const getMyTeamUpData = async (id: string) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/my-teamup/${id}`);
    if (res.data.success) {
      return res.data.data.createdTeamUp;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};
const AppliedTeamUpPage = async () => {
  const loggedInUser = await fetchUserDataFromCookie();
  const teamUpData = await getMyTeamUpData(loggedInUser.userId);
  return (
    <div className="w-screen h-screen">
      <div className="w-full flex flex-col gap-4 items-center pt-10">
        <h1
          className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent text-7xl`}
        >
          Applied Team Up
        </h1>
      </div>
      <div className="w-full px-6 grid grid-cols-3 place-items-center py-20">
        {teamUpData.map((teamUp: AppliedTeamUp) => (
          <TeamUpCard teamUp={teamUp} key={teamUp._id} />
        ))}
      </div>
    </div>
  );
};

export default AppliedTeamUpPage;
