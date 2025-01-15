"use client";
import Image from "next/image";
import loginImage from "../../public/event.jpg";
import { Rowdies, Shadows_Into_Light } from "next/font/google";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/library/zodSchema/LoginSchema";
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

type UserData = z.infer<typeof User>;
const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(User),
  });
  const onSubmit: SubmitHandler<UserData> = async () => {
    try {
      console.log("Success:");
    } catch (error: any) {
      console.error("Error:", error);
      setError("root", {
        type: "manual",
        message: error.message,
      });
    }
  };
  return (
    <div className="w-screen h-screen flex max-sm:flex-col">
      <div className=" relative imageContainer max-sm:hidden flex-1 min-h-screen bg-black flex justify-center items-center">
        <div className="relative imageContainer flex-1 min-h-screen bg-black flex justify-center items-center">
          <div className="relative imageContainer w-full min-h-screen">
            <Image
              src={loginImage}
              alt={"login page image"}
              layout="fill"
              objectFit="cover"
              className="opacity-[0.9] filter blur-[10px]"
            />
          </div>
        </div>
        <div className="absolute  text-white w-full  flex flex-col items-center gap-7">
          <h1 className={` ${rowdies1.className} text-8xl`}>BrandName</h1>
          <p className={`${shadows1.className} text-6xl`}>
            Grow Your Network efficiently
          </p>
        </div>
      </div>

      <div className="credentialContainer text-white min-h-screen max-sm:w-screen max-sm:overflow-y-scroll max-sm:pb-10 w-[500px] bg-black flex flex-col gap-9 items-center px-5 pt-12 overflow-y-scroll py-20">
        <div className="sm:hidden">
          <h1 className={`${rowdies1.className} text-3xl sm:hidden`}>
            Brandname
          </h1>
          <p className={`${shadows1.className}`}>
            Grow Your Network Efficiently
          </p>
        </div>
        <h2
          className={`${rowdies1.className} text-6xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
        >
          Login
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="loginForm flex flex-col items-center gap-7 w-full px-4"
        >
          <div className="w-full flex flex-col gap-2 items-center">
            <input
              type="text"
              {...register("email")}
              className="w-full h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center"
              placeholder="Email address"
            />
             {errors.email && (
            <p style={{ color: "orangered" }}>{errors.email.message}</p>
          )}
          </div>

          <div className="w-full flex flex-col gap-2 items-center">
            <input
              {...register("password")}
              type="password"
              className="w-full h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center"
              placeholder="Password"
            />
            {errors.password && (
            <p style={{ color: "orangered" }}>{errors.password.message}</p>
          )}
          </div>
          <div className="flex gap-2 items-center">
            <p className="">Forgot password?</p>
            <Link
              href={"/forgot-password"}
              className="bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent"
            >
              click here
            </Link>
          </div>

          <button className="w-full bg-[#0c1feb] h-[45px] flex justify-center items-center rounded-md text-xl">
            <p className={rowdies1.className}>Login</p>
          </button>
          <div className="text-white text-xl flex gap-2 items-center">
            <p className={rowdies1.className}>Don't have an Account?</p>
            <Link
              href={"/Register"}
              className={`${rowdies1.className} font-bold bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
            >
              Register
            </Link>
          </div>
        </form>

        <div className="w-full flex justify-between items-center">
          <div className="h-[1px] flex-1 bg-[#0c1feb]"></div>
          <div
            className={`${rowdies1.className} w-[40px] text-center pb-1  text-xl`}
          >
            <p
              style={{
                WebkitTextStroke: "0.7px #0c1feb",
                color: "white",
                fontWeight: "bold",
              }}
            >
              or
            </p>
          </div>
          <div className="h-[1px] flex-1 bg-[#0c1feb]"></div>
        </div>
        <div className=" w-full flex flex-col gap-6 px-4">
          <div className="w-full h-[45px] bg-[#0c1feb] text-white flex gap-2 items-center justify-center rounded-md ">
            <div>
              <FaGoogle />
            </div>
            <p className={`${rowdies1.className}`}>Login with Google</p>
          </div>
          <div className="w-full h-[45px] bg-[#0c1feb] text-white flex gap-2 items-center justify-center rounded-md ">
            <div>
              <FaFacebook />
            </div>
            <p className={`${rowdies1.className}`}>Login with Facebook</p>
          </div>
          <div className="w-full h-[45px] bg-[#0c1feb] text-white flex gap-2 items-center justify-center rounded-md ">
            <div>
              <FaGithub />
            </div>
            <p className={`${rowdies1.className}`}>Login with Github</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
