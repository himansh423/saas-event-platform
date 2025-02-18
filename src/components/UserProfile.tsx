"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Rowdies } from "next/font/google";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Lock, MapPin, Calendar, LinkIcon } from "lucide-react";
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

export default function UserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isRequested, setIsRequested] = useState(false);

  useEffect(() => {}, []);

  const handleRequestContact = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRequested(true);
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-black overflow-hidden flex-shrink-0">
            <Image
              src={profile.profilePicture || "/placeholder.svg"}
              alt={profile.username}
              width={160}
              height={160}
              className="object-cover"
            />
          </div>
          <div className="flex-grow text-center md:text-left">
            <h1
              className={`${rowdies.className} text-3xl md:text-4xl mb-1 text-white`}
            >
              {profile.fullName}
            </h1>
            <p className="text-zinc-400 mb-4">@{profile.username}</p>
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
          <p className="text-lg mb-4">{profile.bio}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-blue-400" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <LinkIcon size={18} className="text-blue-400" />
              <a
                href={`https://${profile.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {profile.website}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-blue-400" />
              <span>{profile.joinedDate}</span>
            </div>
          </div>
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
              <span>
                {profile.isContactVisible
                  ? profile.email
                  : profile.email.replace(/(?<=^.{2}).*(?=@)/, "******")}
              </span>
              {!profile.isContactVisible && (
                <Lock size={16} className="text-zinc-400" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-blue-400" />
              <span>
                {profile.isContactVisible
                  ? profile.phone
                  : profile.phone.replace(/\d(?=\d{4})/g, "*")}
              </span>
              {!profile.isContactVisible && (
                <Lock size={16} className="text-zinc-400" />
              )}
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
            className="bg-gray-900 border border-zinc-700 rounded-lg p-6 mt-4 shadow-lg"
          >
            <p>Saved hackathons will be displayed here.</p>
          </TabsContent>
          <TabsContent
            value="created"
            className="bg-gray-900 border border-zinc-700 rounded-lg p-6 mt-4 shadow-lg"
          >
            <p>Created team-ups will be displayed here.</p>
          </TabsContent>
          <TabsContent
            value="applied"
            className="bg-gray-900 border border-zinc-700 rounded-lg p-6 mt-4 shadow-lg"
          >
            <p>Applied team-ups will be displayed here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
