"use client";
import Image from "next/image";
import loginImage from "../../public/event.jpg";
import { Rowdies, Shadows_Into_Light } from "next/font/google";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useState, useRef, type KeyboardEvent } from "react";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
const shadows1 = Shadows_Into_Light({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

const Verify = () => {
  const router = useRouter();
  const { email } = useSelector((store: RootState) => store.email);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (!/^[0-9]{6}$/.test(enteredOtp)) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post("/api/auth/verify-otp", {
        email,
        otp: enteredOtp,
      });
      if (res.data.success) {
        router.push("/important-questions");
      } else {
        setError(res.data.message || "Invalid OTP");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="relative flex-1 min-h-screen bg-black flex justify-center items-center">
        <Image
          src={loginImage || "/placeholder.svg"}
          alt="login page image"
          layout="fill"
          objectFit="cover"
          className="opacity-90 blur-[10px]"
        />
        <div className="absolute text-white w-full flex flex-col items-center gap-7">
          <h1 className={`${rowdies1.className} text-8xl`}>BrandName</h1>
          <p className={`${shadows1.className} text-6xl`}>
            Grow Your Network efficiently
          </p>
          <div className="text-white text-xl flex gap-2 items-center">
            <p className={rowdies1.className}>Don&apos;t have an Account?</p>
            <p className="font-bold text-[#3a57ff]">Register</p>
          </div>
        </div>
      </div>

      <div className="text-white min-h-screen w-[500px] bg-black flex flex-col justify-center gap-9 items-center px-5 pt-12">
        <h2 className={`${rowdies1.className} text-6xl text-white font-bold`}>
          OTP SENT
        </h2>
        <p className={`${rowdies1.className} text-xl`}>
          OTP sent to your Registered Email address
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-7 w-full px-4"
        >
          <p className="font-bold">Enter 6 Digit OTP</p>
          <div className="w-full flex gap-4 justify-center">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el: any) => (inputRefs.current[index] = el)}
                className="w-[50px] h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center"
              />
            ))}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button className="w-full bg-[#0c1feb] h-[45px] flex justify-center items-center rounded-md text-xl">
            <p className={rowdies1.className}>
              {isSubmitting ? "Verifying" : "Verify OTP"}
            </p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verify;
