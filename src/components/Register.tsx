"use client"
import Image from "next/image"
import RegisterImage from "../../public/event.jpg"
import { Rowdies, Shadows_Into_Light } from "next/font/google"
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa"
import { User } from "../library/zodSchema/RegisterSchema"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { emailActions } from "@/redux/emailSlice"
import { useState, useEffect } from "react"

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
})
const shadows1 = Shadows_Into_Light({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
})

type UserData = z.infer<typeof User>
const Register: React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [usernameMessage, setUsernameMessage] = useState<string>("")
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true)

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UserData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(User),
  })

  const username = watch("username")

  useEffect(() => {
    const checkUsername = async () => {
      if (username) {
        if (!/^[a-z0-9]+$/.test(username)) {
          setUsernameMessage("Username should only contain lowercase letters and numbers")
          setIsUsernameValid(false)
          return
        }

        try {
          const { data } = await axios.post("/api/auth/check-username", {
            username,
          })
          setUsernameMessage(data.message)
          setIsUsernameValid(data.message !== "Username already taken")
        } catch (error) {
          console.error("Error checking username:", error)
          setUsernameMessage("An error occurred while checking the username")
          setIsUsernameValid(false)
        }
      } else {
        setUsernameMessage("")
        setIsUsernameValid(true)
      }
    }

    const timeoutId = setTimeout(checkUsername, 500)
    return () => clearTimeout(timeoutId)
  }, [username])

  const onSubmit: SubmitHandler<UserData> = async (data: UserData) => {
    if (!isUsernameValid) {
      setError("username", {
        type: "manual",
        message: "Please choose a different username",
      })
      return
    }

    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      }
      const res = await axios.post("/api/auth/register", payload)

      if (res.data.success) {
        dispatch(emailActions.setEmail({ data: data.email }))
        router.push(`/auth/verify-otp/${payload.email}`)
      }
    } catch (error:unknown) {
      
      console.error("Error:", error)
      if(error instanceof Error)
      setError("root", {
        type: "manual",
        message: error.message,
      })
    }
  }

  return (
    <div className="w-screen h-screen flex">
      <div className="relative imageContainer flex-1 min-h-screen bg-black flex justify-center items-center">
        <div className="relative imageContainer flex-1 min-h-screen bg-black flex justify-center items-center">
          <div className="relative imageContainer w-full min-h-screen">
            <Image
              src={RegisterImage || "/placeholder.svg"}
              alt={"Register page image"}
              layout="fill"
              objectFit="cover"
              className="opacity-[0.9] filter blur-[10px]"
            />
          </div>
        </div>
        <div className="absolute text-white w-full flex flex-col items-center gap-7">
          <h1 className={`${rowdies1.className} text-8xl`}>BrandName</h1>
          <p className={`${shadows1.className} text-6xl`}>Grow Your Network efficiently</p>
        </div>
      </div>

      <div className="credentialContainer text-white min-h-screen w-[500px] bg-black flex flex-col overflow-y-auto gap-9 items-center px-5 pt-12">
        <h2
          className={`${rowdies1.className} text-6xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
        >
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="RegisterForm flex flex-col items-center gap-7 w-full px-4">
          <input
            {...register("firstName")}
            type="text"
            className="w-full h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center"
            placeholder="First Name"
          />
          {errors.firstName && <p style={{ color: "orangered" }}>{errors.firstName.message}</p>}
          <input
            {...register("lastName")}
            type="text"
            className="w-full h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center"
            placeholder="Last Name"
          />
          {errors.lastName && <p style={{ color: "orangered" }}>{errors.lastName.message}</p>}
          <input
            {...register("username")}
            type="text"
            className="w-full h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center"
            placeholder="Username"
          />
          {usernameMessage && <p style={{ color: isUsernameValid ? "green" : "orangered" }}>{usernameMessage}</p>}
          {errors.username && <p style={{ color: "orangered" }}>{errors.username.message}</p>}
          <input
            {...register("email")}
            type="email"
            className="w-full h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center"
            placeholder="Email"
          />
          {errors.email && <p style={{ color: "orangered" }}>{errors.email.message}</p>}
          <input
            {...register("phoneNumber")}
            type="number"
            className="w-full h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center"
            placeholder="Phone Number"
          />
          {errors.phoneNumber && <p style={{ color: "orangered" }}>{errors.phoneNumber.message}</p>}
          <input
            {...register("password")}
            type="password"
            className="w-full h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center"
            placeholder="Password"
          />
          {errors.password && <p style={{ color: "orangered" }}>{errors.password.message}</p>}
          <input
            {...register("confirmPassword")}
            type="password"
            className="w-full h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && <p style={{ color: "orangered" }}>{errors.confirmPassword.message}</p>}

          <button
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-400 to-[#0c1feb] h-[45px] flex justify-center items-center rounded-md text-xl"
          >
            <p className={rowdies1.className}>{isSubmitting ? "Registering..." : "Register"}</p>
          </button>
          <div className="text-white text-xl flex gap-2 items-center">
            <p className={rowdies1.className}>Already have an Account?</p>
            <Link
              href={"/auth/login"}
              className={`${rowdies1.className} font-bold bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
            >
              Login
            </Link>
          </div>
        </form>

        <div className="w-full flex justify-between items-center">
          <div className="h-[1px] flex-1 bg-[#0c1feb]"></div>
          <div className={`${rowdies1.className} w-[40px] text-center pb-1 text-xl`}>
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
        <div className="w-full flex flex-col gap-6 px-4 pb-10">
          <div className="w-full h-[45px] bg-[#0c1feb] text-white flex gap-2 items-center justify-center rounded-md">
            <div>
              <FaGoogle />
            </div>
            <p className={`${rowdies1.className}`}>Register with Google</p>
          </div>
          <div className="w-full h-[45px] bg-[#0c1feb] text-white flex gap-2 items-center justify-center rounded-md">
            <div>
              <FaFacebook />
            </div>
            <p className={`${rowdies1.className}`}>Register with Facebook</p>
          </div>
          <div className="w-full h-[45px] bg-[#0c1feb] text-white flex gap-2 items-center justify-center rounded-md">
            <div>
              <FaGithub />
            </div>
            <p className={`${rowdies1.className}`}>Register with Github</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

