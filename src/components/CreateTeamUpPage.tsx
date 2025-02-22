"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rowdies } from "next/font/google";
import { useForm, FieldErrors, UseFormSetValue, UseFormWatch, UseFormRegister } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, isAfter } from "date-fns";
import { CalendarIcon, Rocket } from "lucide-react";
import {
  type TeamUpFormData,
  TeamUpSchema,
} from "@/library/zodSchema/TeamUpSchema";
import type { FC, ReactNode } from "react";

const rowdies = Rowdies({ weight: "700", subsets: ["latin"] });

const CreateTeamUpPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TeamUpFormData>({
    resolver: zodResolver(TeamUpSchema),
  });
  const [userId, setUserId] = useState<string>("");
  const [email, setUserEmail] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/decode-token");
        const data = await response.json();
        if (data?.user) {
          setUserId(data.user.userId);
          setUserEmail(data.user.email);
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
        email,
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
      <motion.div className="max-w-6xl mx-auto relative">
        <motion.h1 className={`${rowdies.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent mb-3 text-6xl text-center`}>
          Create Team Up
        </motion.h1>
        <motion.p className="text-xl text-zinc-400 text-center mb-12">
          Fill in the details to create your Team Up
        </motion.p>
        <motion.form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <InputField label="Hackathon/Event Name" name="hackName" register={register} error={errors} placeholder="Enter event name" icon={<Rocket className="text-blue-400" />} />
          <DatePickerField label="Start Date*" name="dateStart" setValue={setValue} watch={watch} error={errors} />
          <DatePickerField label="End Date (Optional)" name="dateEnd" setValue={setValue} watch={watch} error={errors} />
        </motion.form>
      </motion.div>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  name: keyof TeamUpFormData;
  register: UseFormRegister<TeamUpFormData>;
  error?: FieldErrors<TeamUpFormData>;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  icon?: ReactNode;
}

const InputField: FC<InputFieldProps> = ({ label, name, register, error, type = "text", placeholder, maxLength, icon }) => (
  <div className="flex flex-col gap-2 relative">
    <label htmlFor={name} className="text-white text-sm font-medium flex items-center gap-2">
      {icon}
      {label}
    </label>
    <input type={type} {...register(name)} className="w-full h-14 bg-[#141519] rounded-xl border-2 border-blue-700 px-4 text-white" placeholder={placeholder} maxLength={maxLength} />
    {error?.[name] && <p className="text-red-500 text-sm mt-1">{error[name]?.message}</p>}
  </div>
);

interface DatePickerFieldProps {
  label: string;
  name: keyof TeamUpFormData;
  setValue: UseFormSetValue<TeamUpFormData>;
  watch: UseFormWatch<TeamUpFormData>;
  error?: FieldErrors<TeamUpFormData>;
}

const DatePickerField: FC<DatePickerFieldProps> = ({ label, name, setValue, watch, error }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const date = watch(name);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-white text-sm font-medium flex items-center gap-2">
        <CalendarIcon className="text-blue-400" />
        {label}
      </label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button id={name} className="w-full h-14 bg-[#141519] rounded-xl border-2 border-blue-700 px-4 text-left text-white flex items-center justify-between">
            {date ? format(new Date(date), "PPP") : "Pick a date"}
            <CalendarIcon className="h-5 w-5 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date ? new Date(date) : undefined} onSelect={(newDate) => setValue(name, newDate ? newDate.toISOString() : undefined)} disabled={(date) => isAfter(new Date(), date)} />
        </PopoverContent>
      </Popover>
      {error?.[name] && <p className="text-red-500 text-sm mt-1">{error[name]?.message}</p>}
    </div>
  );
};

export default CreateTeamUpPage;
