"use client";
import Image from "next/image";
import loginImage from "../../public/event.jpg";
import { Rowdies, Shadows_Into_Light } from "next/font/google";
import { useParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { otpSchema } from "@/library/zodSchema/otpSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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
type OTP = z.infer<typeof otpSchema>;
const Verify = () => {
  const router = useRouter();
  const params = useParams();
  const email = params?.email;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<OTP>({
    defaultValues: {
      number1: "",
      number2: "",
      number3: "",
      number4: "",
      number5: "",
      number6: "",
    },
    resolver: zodResolver(otpSchema),
  });

  const onSubmit: SubmitHandler<OTP> = async (data: OTP) => {
    const otp = [
      data.number1,
      data.number2,
      data.number3,
      data.number4,
      data.number5,
      data.number6,
    ].join("");

    try {
      const payload = {
        email,
        otp,
      };
      const res = await axios.post("/api/auth/register", payload);

      if (res.data.success) {
        router.push("/");
      }
    } catch (error: any) {
      console.error("Error:", error);
      setError("root", {
        type: "manual",
        message: error.message,
      });
    }
  };
  return (
    <div className="w-screen h-screen flex">
      <div className=" relative imageContainer flex-1 min-h-screen bg-black flex justify-center items-center">
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
          <div className=" text-white text-xl flex gap-2 items-center">
            <p className={rowdies1.className}>Don&apos;t have an Account?</p>
            <p className={`font-bold text-[#3a57ff]`}>Register</p>
          </div>
        </div>
      </div>

      <div className="credentialContainer text-white min-h-screen w-[500px] bg-black flex flex-col justify-center gap-9 items-center px-5 pt-12">
        <h2
          className={`${rowdies1.className} text-6xl`}
          style={{
            WebkitTextStroke: "2px #0c1feb",
            color: "white",
            fontWeight: "bold",
          }}
        >
          OTP SENT
        </h2>
        <p className={`${rowdies1.className} text-xl`}>
          OTP sent to your Registered Email address
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="loginForm flex flex-col items-center gap-7 w-full px-4"
        >
          <p className="font-bold">Enter 6 Digit OTP</p>
          <div className="w-full flex gap-4 justify-center">
            <input
              {...register("number1")}
              type="text"
              maxLength={1}
              className="w-[50px] h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center"
            />
            <input
              {...register("number2")}
              type="text"
              maxLength={1}
              className="w-[50px] h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center "
            />

            <input
              {...register("number3")}
              type="text"
              maxLength={1}
              className="w-[50px] h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center"
            />
            <input
              {...register("number4")}
              type="text"
              maxLength={1}
              className="w-[50px] h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center"
            />
            <input
              {...register("number5")}
              type="text"
              maxLength={1}
              className="w-[50px] h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center"
            />
            <input
              {...register("number6")}
              type="text"
              maxLength={1}
              className="w-[50px] h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center"
            />
          </div>
          {errors.number1 && (
            <p style={{ color: "orangered" }}>{errors.number1.message}</p>
          )}
          <button className="w-full bg-[#0c1feb] h-[45px] flex justify-center items-center rounded-md text-xl">
            <p className={rowdies1.className}>Verify OTP</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verify;
