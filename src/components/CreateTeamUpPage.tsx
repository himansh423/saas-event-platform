"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rowdies } from "next/font/google";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, isAfter } from "date-fns";
import { CalendarIcon, Rocket, MapPin, Phone, LinkIcon } from "lucide-react";
import {
  type TeamUpFormData,
  TeamUpSchema,
} from "@/library/zodSchema/TeamUpSchema";
import type React from "react"; // Import React

const rowdies = Rowdies({ weight: "700", subsets: ["latin"] });

const CreateTeamUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TeamUpFormData>({
    resolver: zodResolver(TeamUpSchema),
  });
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/decode-token");
        const data = await response.json();
        if (data?.user) {
          setUserId(data.user.userId);
        }
      } catch (error) {
        console.error("Error fetching logged-in user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const onSubmit = async (data: TeamUpFormData) => {
    try {
      const formattedData = {
        ...data,
        dateStart: new Date(data.dateStart),
        dateEnd: data.dateEnd ? new Date(data.dateEnd) : undefined,
      };

      const response = await axios.post(
        `/api/create-teamup/${userId}`,
        formattedData
      );
      if (response.data.success) {
        alert("Created successfully");
      }
    } catch (error) {
      console.error("Error creating Team Up:", error);
    }
  };

  return (
    <div className="w-screen min-h-screen py-10 px-5 bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto relative"
      >
        <div className="relative z-10">
          <motion.h1
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`${rowdies.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent mb-3 text-6xl text-center`}
          >
            Create Team Up
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-400 text-center mb-12"
          >
            Fill in the details to create your Team Up
          </motion.p>
        </div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <InputField
            label="Hackathon/Event Name"
            name="hackName"
            register={register}
            error={errors.hackName}
            placeholder="Enter event name"
            icon={<Rocket className="text-blue-400" />}
          />
          <DatePickerField
            label="Start Date*"
            name="dateStart"
            setValue={setValue}
            watch={watch}
            error={errors.dateStart}
          />
          <DatePickerField
            label="End Date (Optional)"
            name="dateEnd"
            setValue={setValue}
            watch={watch}
            error={errors.dateEnd}
          />
          <InputField
            label="Short Description"
            name="description"
            register={register}
            error={errors.description}
            placeholder="Enter Short Description"
            maxLength={50}
            icon={<Rocket className="text-blue-400" />}
          />
          <InputField
            label="Location"
            name="location"
            register={register}
            error={errors.location}
            placeholder="Enter location"
            icon={<MapPin className="text-blue-400" />}
          />
          <InputField
            label="Mobile Number"
            name="mobileNumber"
            register={register}
            error={errors.mobileNumber}
            placeholder="Enter mobile number"
            icon={<Phone className="text-blue-400" />}
          />
          <InputField
            label="Hackathon URL"
            name="eventOrHackathonUrl"
            register={register}
            error={errors.eventOrHackathonUrl}
            placeholder="Enter Hackathon or Event URL"
            icon={<LinkIcon className="text-blue-400" />}
          />
          <motion.div
            className="md:col-span-2 mt-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              type="submit"
              className={`w-full h-16 bg-gradient-to-r from-blue-400 to-[#0c1feb] rounded-xl text-white text-2xl ${rowdies.className} transition-all duration-300 ease-in-out transform hover:shadow-lg hover:shadow-blue-500/50 relative overflow-hidden`}
            >
              <span className="relative z-10">Create Team Up</span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  name: keyof TeamUpFormData;
  register: any;
  error?: any;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
  maxLength,
  icon,
}) => (
  <div className="flex flex-col gap-2 relative">
    <label
      htmlFor={name}
      className="text-white text-sm font-medium flex items-center gap-2"
    >
      {icon}
      {label}
    </label>
    <input
      type={type}
      {...register(name)}
      className="w-full h-14 bg-[#141519] rounded-xl focus:outline-none border-2 border-blue-700 focus:border-blue-400 placeholder:text-zinc-500 px-4 text-white transition-all duration-300 ease-in-out"
      placeholder={placeholder}
      maxLength={maxLength}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    {maxLength && (
      <p className="text-xs text-zinc-400 absolute right-2 bottom-2">
        Max {maxLength}
      </p>
    )}
  </div>
);

interface DatePickerFieldProps {
  label: string;
  name: keyof TeamUpFormData;
  setValue: any;
  watch: any;
  error?: any;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  name,
  setValue,
  watch,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const date = watch(name);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-white text-sm font-medium flex items-center gap-2"
      >
        <CalendarIcon className="text-blue-400" />
        {label}
      </label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            id={name}
            className={cn(
              "w-full h-14 bg-[#141519] rounded-xl focus:outline-none border-2 border-blue-700 focus:border-blue-400 placeholder:text-zinc-500 px-4 text-left text-white transition-all duration-300 ease-in-out flex items-center justify-between",
              !date && "text-zinc-500"
            )}
          >
            {date ? format(new Date(date), "PPP") : "Pick a date"}
            <CalendarIcon className="h-5 w-5 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date ? new Date(date) : undefined}
            onSelect={(newDate) => {
              setValue(name, newDate ? newDate.toISOString() : undefined);
              setIsOpen(false);
            }}
            disabled={(date) => isAfter(new Date(), date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default CreateTeamUpPage;
