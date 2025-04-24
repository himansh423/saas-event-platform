import { Rowdies } from "next/font/google";
import MyTeamUpCard from "./MyTeamUpCard";
import { cookies } from "next/headers";
import axios from "axios";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

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
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

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

const MyTeamUpPage = async () => {
  const loggedInUser = await fetchUserDataFromCookie();
  const myTeamUpData = await getMyTeamUpData(loggedInUser.userId);

  return (
    <div className="w-screen h-screen relative">
      <div className="w-full flex flex-col gap-4 items-center pt-10">
        <h1
          className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent text-7xl`}
        >
          My Team Up
        </h1>
        <p className="text-zinc-400 text-xl">
          Discover the latest insights, tutorials, and updates from our team.
        </p>
      </div>
      <div className="w-full px-6 grid grid-cols-3 place-items-center py-20">
        {myTeamUpData?.map((myTeamUp: MyTeamUp) => (
          <MyTeamUpCard myTeamUp={myTeamUp} key={myTeamUp._id} />
        ))}
      </div>
    </div>
  );
};

export default MyTeamUpPage;