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
      return res.data.data.createdTeamUp;
    }
  } catch (error) {
    console.log(error)
    return [];
  }
};

interface MyTeamUp {
  _id: string;
  hackName: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  location: string;
  email: string;
  mobileNumber: string;
  eventOrHackathonUrl: string;
}
const MyTeamUpPage = async () => {
  const loggedInUser = await fetchUserDataFromCookie();
  const myTeamUpData = await getMyTeamUpData(loggedInUser.userId);

  return (
    <div className="w-screen h-screen relative">
      <div className="w-[70vw] h-[80vh] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] rounded-lg border-zinc-400 border-[1px] bg-black flex flex-col items-center gap-6 px-5 py-5">
        <p
          className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] text-center bg-clip-text text-transparent text-5xl`}
        >
          Applications
        </p>
        <div className="w-full flex-1 bg-gray-900 rounded-md px-3 py-3 flex flex-col gap-3">
          <div className="w-full h-[70px] bg-gray-950 border-[1px]  rounded-sm border-zinc-400"></div>
        </div>
      </div>
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
