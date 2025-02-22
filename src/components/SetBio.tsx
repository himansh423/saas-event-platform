"use client";
import { Rowdies } from "next/font/google";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bio } from "@/library/zodSchema/bioSchema";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userAction } from "@/redux/userSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const rowdies = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
type BioData = z.infer<typeof Bio>;
export default function BioInputPage() {
  const { loggedInUser } = useSelector((store: RootState) => store.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [bioLength, setBioLength] = useState(0);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<BioData>({
    defaultValues: {
      bio: "",
    },
    resolver: zodResolver(Bio),
  });

  const bioValue = watch("bio", "");

  useEffect(() => {
    setBioLength(bioValue.length);
  }, [bioValue]);

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

  const onSubmit: SubmitHandler<BioData> = async (data: BioData) => {
    try {
      const payload = {
        bio: data.bio,
      };
      const res = await axios.patch(
        `/api/save-bio/${loggedInUser?.userId}`,
        payload
      );

      if (res.data.success) {
        router.push(`/`);
      }
    } catch (error: unknown) {
      console.error("Error:", error);
      if(error instanceof Error)
      setError("root", {
        type: "manual",
        message: error.message,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-screen min-h-screen bg-black flex items-center justify-center p-4"
    >
      <div className="w-full max-w-2xl bg-gradient-to-br from-[#0c1feb]/20 to-blue-500/10 border border-[#0c1feb]/20 rounded-lg p-8">
        <h1
          className={`${rowdies.className} text-4xl text-center mb-6 bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
        >
          Write about yourself - Bio
        </h1>
        <textarea
          {...register("bio")}
          placeholder="Enter your bio here (max 100 characters)"
          className="w-full h-40 bg-gray-950 border border-zinc-400 rounded-lg p-4 text-white text-xl resize-none focus:outline-none focus:border-blue-500"
          maxLength={100}
        />
        {errors.bio && (
          <p style={{ color: "orangered" }}>{errors.bio.message}</p>
        )}
        <p className="text-zinc-400 text-right mt-2">
          {bioLength}/100 characters
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSubmitting? "Submitting....":"Submit"}
        </button>
      </div>
    </form>
  );
}
