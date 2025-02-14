"use client";
import { useState } from "react";
import axios from "axios";
import { Rowdies } from "next/font/google";
import { Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { forgotPasswordAction } from "@/redux/fogotPasswordSlice";
import { z } from "zod";
import { Email } from "@/library/zodSchema/ForgotPasswordSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const rowdies = Rowdies({
  weight: "700",
  subsets: ["latin"],
});

type EmailData = z.infer<typeof Email>;
export default function ForgotPassword() {
  const { message } = useSelector((store: RootState) => store.forgotPassword);
  const dispatch = useDispatch();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailData>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(Email),
  });

  const onSubmit: SubmitHandler<EmailData> = async (data: EmailData) => {
    const payload = data.email;
    try {
      const { data } = await axios.post("/api/auth/forgot-password", payload);
      dispatch(forgotPasswordAction.setMessage({ data: data.message }));
    } catch (error: any) {
      dispatch(
        forgotPasswordAction.setMessage({
          data: error.response?.data?.error || "Something went wrong",
        })
      );
      setError("root", {
        type: "manual",
        message: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1
          className={`${rowdies.className} text-4xl mb-8 text-center bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
        >
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 bg-gray-900 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white pl-12"
            />
            <Mail className="absolute left-4 top-3.5 text-zinc-400" size={20} />
            {errors.email && (
            <p style={{ color: "orangered" }}>{errors.email.message}</p>
          )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${rowdies.className} w-full h-12 bg-gradient-to-r from-blue-400 to-[#0c1feb] rounded-md text-white flex items-center justify-center text-xl hover:from-blue-500 hover:to-[#1a2aff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm bg-gray-900 border border-zinc-700 rounded-md p-3">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
