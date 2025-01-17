"use client";
import { EventOrHackathon } from "@/library/zodSchema/AddEventOrHackathonSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rowdies } from "next/font/google";
import { useForm } from "react-hook-form";
import { z } from "zod";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

type EventOrHackathonFormData = z.infer<typeof EventOrHackathon>;

const AddEventOrHackathon = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EventOrHackathonFormData>({
    defaultValues: {
      name: "",
      shortDescription: "",
      date: "",
      modeOfEvent: "",
      typeOfEvent: "",
      isOpen: false,
      theme: [""],
      logo: "",
      loaction: "",
      prize: "",
      teamSize: "",
      aboutDescriptions: "",
      eventPoster: "",
      instagramLink: "",
      twitterLink: "",
    },
    resolver: zodResolver(EventOrHackathon),
  });

  const onSubmit = async (data: EventOrHackathonFormData) => {
    try {
      console.log(data);
      // Add your form submission logic here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen min-h-screen py-10 px-5">
      <div className="w-full h-[200px] flex flex-col gap-1 py-5">
        <p className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent mb-3 text-5xl`}>
          Create Event or Hackathon
        </p>
        <p className="text-xl text-zinc-400">
          Fill in the details to create your event
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
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
                  <p className="text-red-500">{errors.name.message}</p>
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
                  <p className="text-red-500">{errors.date.message}</p>
                )}
              </div>
              <div className="text-white flex flex-col gap-1">
                <label htmlFor="typeOfEvent">Type of Event</label>
                <input
                  {...register("typeOfEvent")}
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-4"
                  placeholder="Enter type of event"
                />
                {errors.typeOfEvent && (
                  <p className="text-red-500">{errors.typeOfEvent.message}</p>
                )}
              </div>
            </div>
            <div className="w-1/2 h-full justify-between pr-3 flex flex-col gap-6">
              <div className="text-white flex flex-col gap-1">
                <label htmlFor="shortDescription">Short Description</label>
                <input
                  {...register("shortDescription")}
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-4"
                  placeholder="Enter Short Description"
                />
                <p className="text-xs text-zinc-400">Max 30 Characters</p>
                {errors.shortDescription && (
                  <p className="text-red-500">{errors.shortDescription.message}</p>
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
                  <p className="text-red-500">{errors.modeOfEvent.message}</p>
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
              className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-5"
              placeholder="Enter themes (commas-seperated)"
            />
            <p className="text-zinc-400 text-xs">
              Enter themes separated by commas
            </p>
            {errors.theme && (
              <p className="text-red-500">{errors.theme.message}</p>
            )}
          </div>
          <div className="w-full h-[190px] mt-10 pr-3 flex justify-between gap-20">
            <div className="w-1/2 flex flex-col justify-between">
              <div className="text-white flex flex-col gap-1">
                <label htmlFor="logo">Logo URL</label>
                <input
                  {...register("logo")}
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-4"
                  placeholder="Enter logo URL"
                />
                {errors.logo && (
                  <p className="text-red-500">{errors.logo.message}</p>
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
                  <p className="text-red-500">{errors.prize.message}</p>
                )}
              </div>
            </div>
            <div className="w-1/2 h-full flex flex-col justify-between">
              <div className="text-white flex flex-col gap-1">
                <label htmlFor="loaction">Location</label>
                <input
                  {...register("loaction")}
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-4"
                  placeholder="Enter location"
                />
                {errors.loaction && (
                  <p className="text-red-500">{errors.loaction.message}</p>
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
                  <p className="text-red-500">{errors.teamSize.message}</p>
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
              className="w-full min-h-[140px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-3 py-2"
              placeholder="Enter about description"
            />
            <p className="text-zinc-400 text-xs">Minimum 50 Characters</p>
            {errors.aboutDescriptions && (
              <p className="text-red-500">{errors.aboutDescriptions.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 mt-7 pr-3">
            <label htmlFor="eventPoster" className="text-white">
              Event poster URL
            </label>
            <input
              {...register("eventPoster")}
              type="text"
              className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-5"
              placeholder="Enter event Poster URL"
            />
            <p className="text-zinc-400 text-xs">Enter event poster URL</p>
            {errors.eventPoster && (
              <p className="text-red-500">{errors.eventPoster.message}</p>
            )}
          </div>
          <div className="w-full mt-10 pr-3 flex justify-between gap-20">
            <div className="w-1/2 flex flex-col justify-between">
              <div className="text-white flex flex-col gap-2">
                <label htmlFor="instagramLink">Instagram URL(Optional)</label>
                <input
                  {...register("instagramLink")}
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-4"
                  placeholder="Enter instagram URL"
                />
                {errors.instagramLink && (
                  <p className="text-red-500">{errors.instagramLink.message}</p>
                )}
              </div>
            </div>
            <div className="w-1/2 h-full flex flex-col justify-between">
              <div className="text-white flex flex-col gap-2">
                <label htmlFor="twitterLink">Twitter URL(Optional)</label>
                <input
                  {...register("twitterLink")}
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400 px-4"
                  placeholder="Enter twitter URL"
                />
                {errors.twitterLink && (
                  <p className="text-red-500">{errors.twitterLink.message}</p>
                )}
              </div>
            </div>