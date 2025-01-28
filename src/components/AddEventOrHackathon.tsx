"use client";
import { EventOrHackathon } from "@/library/zodSchema/AddEventOrHackathonSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Rowdies } from "next/font/google";
import { useState } from "react";
import { RegisterOptions, useForm } from "react-hook-form";
import { z } from "zod";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

type EventOrHackathonFormData = z.infer<typeof EventOrHackathon>;

const AddEventOrHackathon = () => {
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EventOrHackathonFormData>({
    defaultValues: {
      name: "",
      shortDescription: "",
      date: "",
      modeOfEvent: "",
      typeOfEvent: "",
      isOpen: false,
      theme: [""],
      logo: undefined,
      location: "",
      prize: "",
      teamSize: "",
      aboutDescriptions: "",
      eventPoster: undefined,
      instagramLink: "",
      twitterLink: "",
      eventOrHackathonUrl: "",
    },
    resolver: zodResolver(EventOrHackathon),
  });

  const uploadFileToS3 = async (file: File, uploadUrl: string) => {
    if (!file || !(file instanceof File)) {
      throw new Error("Invalid file provided");
    }

    try {
      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to upload file to S3: ${error.message}`);
      }
      throw error;
    }
  };

  const onSubmit = async (data: EventOrHackathonFormData) => {
    try {
      setIsUploading(true);

      const processedThemes = data.theme[0]
        .split(",")
        .map((theme) => theme.trim())
        .filter((theme) => theme);

      const logoFile = data.logo instanceof FileList ? data.logo[0] : null;
      const eventPosterFile =
        data.eventPoster instanceof FileList ? data.eventPoster[0] : null;

      const { data: presignedData } = await axios.post(
        "/api/get-presigned-url-to-upload-on-s3",
        {
          logoFileName: logoFile?.name,
          logoFileType: logoFile?.type,
          bannerFileName: eventPosterFile?.name,
          bannerFileType: eventPosterFile?.type,
        }
      );

      const { logoUploadUrl, bannerUploadUrl, logoKey, bannerKey } =
        presignedData;

      const uploadPromises = [];

      if (logoFile) {
        uploadPromises.push(uploadFileToS3(logoFile, logoUploadUrl));
      }

      if (eventPosterFile) {
        uploadPromises.push(uploadFileToS3(eventPosterFile, bannerUploadUrl));
      }

      await Promise.all(uploadPromises);

      await axios.post("/api/save-event-to-database", {
        ...data,
        theme: processedThemes,
        logoKey,
        bannerKey,
      });

      alert("Event created successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      if (axios.isAxiosError(error)) {
        alert(
          `Failed to create event: ${
            error.response?.data?.error || error.message
          }`
        );
      } else {
        alert("Failed to create event. Please try again.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const fileValidation = {
    validate: (value: FileList | null | undefined) => {
      if (!value || value.length === 0) return true;
      const file = value[0];

      if (!file) return true;
      if (!file.type.startsWith("image/")) return "Please upload an image file";
      if (file.size > 5 * 1024 * 1024) return "File size must be less than 5MB";

      return true;
    },
  } as const;

  return (
    <div className="w-screen min-h-screen py-10 px-5">
      <div className="w-full h-[200px] flex flex-col gap-1 py-5">
        <p
          className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent mb-3 text-5xl`}
        >
          Create Event or Hackathon
        </p>
        <p className="text-xl text-zinc-400">
          Fill in the details to create your event
        </p>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full"
        >
          <div className="w-full h-[400px] flex justify-between gap-20">
            <div className="w-1/2 h-full flex flex-col justify-between">
              <div className="text-white flex flex-col gap-1">
                <label htmlFor="name">Event Name</label>
                <input
                  {...register("name")}
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-4"
                  placeholder="Enter event name"
                />
                {errors.name && (
                  <p className="text-orange-500 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="text-white flex flex-col gap-1">
                <label htmlFor="date">Date</label>
                <input
                  {...register("date")}
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-4"
                  placeholder="Enter Date or Date Range"
                />
                {errors.date && (
                  <p className="text-orange-500 text-sm">
                    {errors.date.message}
                  </p>
                )}
              </div>
              <div className="text-white flex flex-col gap-1">
                <label htmlFor="typeOfEvent">Type of Event</label>
                <select
                  {...register("typeOfEvent")}
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-4"
                  
                >
                  <option value="event">Event</option>
                  <option value="hackathon">Hackathon</option>
                </select>
                {errors.typeOfEvent && (
                  <p className="text-orange-500 text-sm">
                    {errors.typeOfEvent.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-1/2 h-full justify-between pr-3 flex flex-col gap-6">
              <div className="text-white flex flex-col gap-1">
                <label htmlFor="shortDescription">Short Description</label>
                <input
                  {...register("shortDescription")}
                  type="text"
                  maxLength={30}
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-4"
                  placeholder="Enter Short Description"
                />
                <p className="text-xs text-zinc-400">Max 30 Characters</p>
                {errors.shortDescription && (
                  <p className="text-orange-500 text-sm">
                    {errors.shortDescription.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-white">Mode of Event</p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    {...register("modeOfEvent")}
                    type="radio"
                    value="Online"
                    className="hidden peer"
                  />
                  <span className="w-5 h-5 rounded-full border-2 border-[#2563EB] bg-black peer-checked:bg-[#2563EB] peer-checked:border-[#1D4ED8]"></span>
                  <span className="text-zinc-400">Online</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    {...register("modeOfEvent")}
                    type="radio"
                    value="Offline"
                    className="hidden peer"
                  />
                  <span className="w-5 h-5 rounded-full border-2 border-[#2563EB] bg-black peer-checked:bg-[#2563EB] peer-checked:border-[#1D4ED8]"></span>
                  <span className="text-zinc-400">Offline</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    {...register("modeOfEvent")}
                    type="radio"
                    value="Hybrid"
                    className="hidden peer"
                  />
                  <span className="w-5 h-5 rounded-full border-2 border-[#2563EB] bg-black peer-checked:bg-[#2563EB] peer-checked:border-[#1D4ED8]"></span>
                  <span className="text-zinc-400">Hybrid</span>
                </label>
                {errors.modeOfEvent && (
                  <p className="text-orange-500 text-sm">
                    {errors.modeOfEvent.message}
                  </p>
                )}
              </div>
              <div className="w-full h-[100px] rounded-lg border-[1px] border-blue-700 px-4 py-4 flex items-center justify-between bg-[#141519]">
                <div className="flex flex-col gap-1">
                  <p className="text-white text-xl font-semibold">
                    Open for Registration
                  </p>
                  <p className="text-xs text-zinc-400">
                    Is the event open for registration?
                  </p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      {...register("isOpen")}
                      type="checkbox"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500"></div>
                    <div className="absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-7 pr-3">
            <label htmlFor="theme" className="text-white">
              Theme
            </label>
            <input
              {...register("theme.0")}
              type="text"
              className=" text-white w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-5"
              placeholder="Enter themes (commas-seperated)"
            />
            {errors.theme && (
              <p className="text-orange-500 text-sm">{errors.theme.message}</p>
            )}
            <p className="text-zinc-400 text-xs">
              Enter themes separated by commas
            </p>
          </div>
          <div className="w-full h-[190px] mt-10 pr-3 flex justify-between gap-20">
            <div className="w-1/2 flex flex-col justify-between">
              <div className="text-white flex flex-col gap-1">
                <label htmlFor="logo">Logo</label>
                <input
                  {...register("logo", fileValidation)}
                  type="file"
                  accept="image/*"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-4 py-2"
                />
                {errors.logo && (
                  <p className="text-orange-500 text-sm">
                    {errors.logo.message}
                  </p>
                )}
              </div>
              <div className="text-white flex flex-col gap-1">
                <label htmlFor="prize">Prize</label>
                <input
                  {...register("prize")}
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-4"
                  placeholder="Enter prize details"
                />
                {errors.prize && (
                  <p className="text-orange-500 text-sm">
                    {errors.prize.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-1/2 h-full flex flex-col justify-between">
              <div className="text-white flex flex-col gap-1">
                <label htmlFor="location">Location</label>
                <input
                  {...register("location")}
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-4"
                  placeholder="Enter location"
                />
                {errors.location && (
                  <p className="text-orange-500 text-sm">
                    {errors.location.message}
                  </p>
                )}
              </div>
              <div className="text-white flex flex-col gap-1">
                <label htmlFor="teamSize">Team Size</label>
                <input
                  {...register("teamSize")}
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-4"
                  placeholder="Enter team size"
                />
                {errors.teamSize && (
                  <p className="text-orange-500 text-sm">
                    {errors.teamSize.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-7 pr-3">
            <label htmlFor="aboutDescriptions" className="text-white">
              About Description
            </label>
            <textarea
              {...register("aboutDescriptions")}
              minLength={50}
              className=" text-white w-full min-h-[140px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-3 py-2"
              placeholder="Enter about description"
            />
            {errors.aboutDescriptions && (
              <p className="text-orange-500 text-sm">
                {errors.aboutDescriptions.message}
              </p>
            )}
            <p className="text-zinc-400 text-xs">Minimum 50 Characters</p>
          </div>
          <div className="flex flex-col gap-1 mt-7 pr-3">
            <label htmlFor="eventPoster" className="text-white">
              Event Poster
            </label>
            <input
              {...register("eventPoster", fileValidation)}
              type="file"
              accept="image/*"
              className=" text-white w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-4 py-2"
            />
            {errors.eventPoster && (
              <p className="text-orange-500 text-sm">
                {errors.eventPoster.message}
              </p>
            )}
          </div>
          <div className="w-full mt-10 pr-3 flex justify-between gap-20">
            <div className="w-1/2 flex flex-col justify-between">
              <div className="text-white flex flex-col gap-2">
                <label htmlFor="instagramLink">Instagram URL (Optional)</label>
                <input
                  {...register("instagramLink")}
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-4"
                  placeholder="Enter Instagram URL"
                />
                {errors.instagramLink && (
                  <p className="text-orange-500 text-sm">
                    {errors.instagramLink.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-1/2 h-full flex flex-col justify-between">
              <div className="text-white flex flex-col gap-2">
                <label htmlFor="twitterLink">Twitter URL (Optional)</label>
                <input
                  {...register("twitterLink")}
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-4"
                  placeholder="Enter Twitter URL"
                />
                {errors.twitterLink && (
                  <p className="text-orange-500 text-sm">
                    {errors.twitterLink.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-7 pr-3">
            <label htmlFor="event-Or-Hackathon-Url" className="text-white">
              Hackathon URL
            </label>
            <input
              {...register("eventOrHackathonUrl")}
              type="url"
              className=" text-white w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-5"
              placeholder="Enter Hackathon or Event URL"
            />
            {errors.eventOrHackathonUrl && (
              <p className="text-orange-500 text-sm">
                {errors.eventOrHackathonUrl.message}
              </p>
            )}
          </div>
          <div className="w-full h-[60px] pr-3 mt-6 mb-10">
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className={`w-full h-full bg-gradient-to-r from-blue-400 to-[#0c1feb] rounded-lg text-white text-2xl ${
                rowdies1.className
              } ${
                isSubmitting || isUploading
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
            >
              {isUploading
                ? "Uploading Files..."
                : isSubmitting
                ? "Creating Event..."
                : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventOrHackathon;
