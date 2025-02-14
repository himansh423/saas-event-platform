"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Rowdies } from "next/font/google";
import { Lock, Eye, EyeOff } from "lucide-react";
import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { forgotPasswordAction } from "@/redux/fogotPasswordSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { ResetPasswordSchema } from "@/library/zodSchema/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const rowdies = Rowdies({
  weight: "700",
  subsets: ["latin"],
});
type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;
export default function ResetPassword() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const dispatch = useDispatch();
  const { showPassword, resetMessage } = useSelector(
    (store: RootState) => store.forgotPassword
  );

  useEffect(() => {
    if (!token || !email)
      dispatch(
        forgotPasswordAction.setResetMessage({ data: "Invalid reset link" })
      );
  }, [token, email]);

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordData> = async (
    data: ResetPasswordData
  ) => {
    const newPassword = data.password;
    try {
      const { data } = await axios.post("/api/auth/reset-password", {
        email,
        token,
        newPassword,
      });
      dispatch(forgotPasswordAction.setResetMessage({ data: data.message }));
    } catch (error: any) {
      dispatch(
        forgotPasswordAction.setResetMessage({
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
          Reset Password
        </h1>
        {resetMessage && (
          <p className="mb-6 text-center text-sm bg-gray-900 border border-zinc-700 rounded-md p-3">
            {resetMessage}!{" "}
            <Link className="text-blue-500" href={"/auth/login"}>
              Login
            </Link>
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              {...register("password")}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white pl-12 pr-12"
            />
            {errors.password && (
              <p style={{ color: "orangered" }}>{errors.password.message}</p>
            )}
            <Lock className="absolute left-4 top-3.5 text-zinc-400" size={20} />
            <button
              type="button"
              onClick={() => dispatch(forgotPasswordAction.setShowPassword())}
              className="absolute right-4 top-3.5 text-zinc-400 hover:text-zinc-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm new password"
              {...register("confirmPassword")}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white pl-12 pr-12"
            />
            {errors.confirmPassword && (
              <p style={{ color: "orangered" }}>
                {errors.confirmPassword.message}
              </p>
            )}
            <Lock className="absolute left-4 top-3.5 text-zinc-400" size={20} />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !token || !email}
            className={`${rowdies.className} w-full h-12 bg-gradient-to-r from-blue-400 to-[#0c1feb] rounded-md text-white flex items-center justify-center text-xl hover:from-blue-500 hover:to-[#1a2aff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
