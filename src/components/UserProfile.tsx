"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Rowdies } from "next/font/google";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useParams } from "next/navigation";
import axios from "axios";
import { userProfileActions } from "@/redux/userProfileSlice";
import EventCard from "./EventCard";
import TeamUpCard from "./TeamUpCard";
const rowdies = Rowdies({
  weight: "700",
  subsets: ["latin"],
});

interface UserProfile {
  username: string;
  fullName: string;
  bio: string;
  profilePicture: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  joinedDate: string;
  isContactVisible: boolean;
}
interface CardData {
  _id: string;
  name: string;
  shortDescription: string;
  dateStart: Date;
  dateEnd: Date;
  modeOfEvent: string;
  isOpen: boolean;
  theme: string[];
  location: string;
  prize: string;
}
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
export default function UserProfile() {
  const { loggedInUser } = useSelector((store: RootState) => store.userProfile);
  const { username } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`/api/get-user-profile/${username}`);
        if (res.data.success) {
          dispatch(userProfileActions.setProfileData({ data: res.data.data }));
          console.log("checking idddd: ", res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  const [isRequested, setIsRequested] = useState(false);

  const handleRequestContact = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRequested(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-black overflow-hidden flex-shrink-0">
            <Image
              src={loggedInUser?.profilePicture || "/placeholder.svg"}
              alt={loggedInUser?.username || "Username"}
              width={160}
              height={160}
              className="object-cover"
            />
          </div>
          <div className="flex-grow text-center md:text-left">
            <h1
              className={`${rowdies.className} text-3xl md:text-4xl mb-1 text-white`}
            >
              {loggedInUser?.firstName} {loggedInUser?.lastName}
            </h1>
            <p className="text-zinc-400 mb-4">@{loggedInUser?.username}</p>
            <Button
              onClick={handleRequestContact}
              disabled={isRequested}
              className="w-full md:w-auto bg-gradient-to-r from-blue-400 to-[#0c1feb] hover:from-blue-500 hover:to-[#1a2aff]"
            >
              {isRequested ? "Request Sent" : "Request Contact Details"}
            </Button>
          </div>
        </div>

        <div className="mt-8 bg-gray-900 border border-zinc-700 rounded-lg p-6 shadow-lg">
          <p className="text-lg mb-4">{loggedInUser?.bio}</p>
        </div>

        <div className="mt-6 bg-gray-900 border border-zinc-700 rounded-lg p-6 shadow-lg">
          <h2
            className={`${rowdies.className} text-2xl mb-4 bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
          >
            Contact Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-blue-400" />
              <span>{loggedInUser?.email}</span>
              {/* {!profile.isContactVisible && (
                <Lock size={16} className="text-zinc-400" />
              )} */}
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-blue-400" />
              <span>{loggedInUser?.phoneNumber}</span>
              {/* {!profile.isContactVisible && (
                <Lock size={16} className="text-zinc-400" />
              )} */}
            </div>
          </div>
        </div>

        <Tabs defaultValue="saved" className="mt-8">
          <TabsList className="bg-gray-900 border border-zinc-700 rounded-lg overflow-hidden w-full">
            <TabsTrigger
              value="saved"
              className="flex-1 py-3 data-[state=active]:bg-blue-700"
            >
              Saved Hackathons
            </TabsTrigger>
            <TabsTrigger
              value="created"
              className="flex-1 py-3 data-[state=active]:bg-blue-700"
            >
              Created Team-ups
            </TabsTrigger>
            <TabsTrigger
              value="applied"
              className="flex-1 py-3 data-[state=active]:bg-blue-700"
            >
              Applied Team-ups
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="saved"
            className="bg-gray-900 border border-zinc-700 rounded`-lg p-6 mt-4 shadow-lg flex flex-col items-center "
          >
            {loggedInUser?.savedEventAndHackathon &&
            loggedInUser.savedEventAndHackathon.length > 0 ? (
              loggedInUser.savedEventAndHackathon.map((card: CardData) => (
                <div className="mt-16" key={card._id}>
                  <EventCard  card={card} userId={loggedInUser._id} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-zinc-400">
                No events available at the moment.
              </div>
            )}
          </TabsContent>
          <TabsContent
            value="created"
            className="bg-gray-900 border border-zinc-700 rounded-lg p-6 mt-4 shadow-lg flex flex-col items-center"
          >
            {loggedInUser?.createdTeamUp.map((teamUp: TeamUp) => (
              <TeamUpCard
              key={teamUp._id}
                teamUp={{
                  ...teamUp,
                  createdBy: {
                    firstName: loggedInUser.firstName,
                    lastName: loggedInUser.lastName,
                  },
                }}
              />
            ))}
          </TabsContent>
          <TabsContent
            value="applied"
            className="bg-gray-900 border border-zinc-700 rounded-lg p-6 mt-4 shadow-lg flex flex-col items-center"
          ></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
