"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Rowdies } from "next/font/google";
import { Camera, Loader2 } from "lucide-react";
import axios from "axios";
import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "@/redux/userSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const rowdies = Rowdies({
  weight: "700",
  subsets: ["latin"],
});

export default function ProfileUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { loggedInUser } = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/decode-token");
        const data = await response.json();
        if (data?.user) {
          dispatch(userAction.setLoggedInUser({ data: data.user }));
        }
      } catch (error) {
        console.error("Error fetching logged-in user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setFile(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const fileName = file.name;
      const fileType = file.type;

      const { data } = await axios.post(
        "/api/get-presigned-url-to-upload-profile-picture-s3",
        {
          profilePictureFileName: fileName,
          profilePictureFileType: fileType,
        }
      );

      const { profilePictureUploadUrl, profilePictureKey } = data;

      await axios.put(profilePictureUploadUrl, file, {
        headers: { "Content-Type": fileType },
      });

      const userId = loggedInUser?.userId;
      const res = await axios.patch(
        `/api/save-profile-picture-on-database/${userId}`,
        {
          profilePictureKey,
        }
      );

      if (res.data.success) {
        router.push("/write-about-yourself");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1
          className={`${rowdies.className} text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
        >
          Upload Profile Picture
        </h1>

        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="w-full h-full rounded-full border-4 border-blue-500 overflow-hidden relative">
            {image ? (
              <Image
                src={image}
                alt="Profile"
                fill
                className="rounded-full object-cover"
                sizes="256px"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center rounded-full">
                <Camera size={64} className="text-gray-400" />
              </div>
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors duration-200"
          >
            <Camera size={24} />
          </button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-gradient-to-r from-blue-400 to-[#0c1feb] text-white rounded-md py-2 px-4 mb-4 hover:from-blue-500 hover:to-[#0d20ff] transition-all duration-200"
        >
          <span className={rowdies.className}>Choose Image</span>
        </button>

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`w-full flex justify-center items-center bg-gradient-to-r from-blue-400 to-[#0c1feb] text-white rounded-md py-2 px-4 ${
            file && !loading
              ? "hover:from-blue-500 hover:to-[#0d20ff]"
              : "opacity-50 cursor-not-allowed"
          } transition-all duration-200`}
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span className={rowdies.className}>Set Profile Picture</span>
          )}
        </button>
      </div>
    </div>
  );
}
