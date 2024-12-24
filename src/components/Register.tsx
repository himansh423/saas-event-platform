import Image from "next/image";
import RegisterImage from "../../public/event.jpg";
import { Rowdies, Shadows_Into_Light } from "next/font/google";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
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
const Register = () => {
  return (
    <div className="w-screen h-screen flex">
      <div className=" relative imageContainer flex-1 min-h-screen bg-black flex justify-center items-center">
        <div className="relative imageContainer flex-1 min-h-screen bg-black flex justify-center items-center">
          <div className="relative imageContainer w-full min-h-screen">
            <Image
              src={RegisterImage}
              alt={"Register page image"}
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
            <p className={rowdies1.className}>Already have an Account?</p>
            <p  className={`font-bold text-[#3a57ff]`}>Register</p>
          </div>
      </div>
        </div>
       

      <div className="credentialContainer text-white min-h-screen w-[500px] bg-black flex flex-col overflow-y-auto gap-9 items-center px-5 pt-12">
        <h2
          className={`${rowdies1.className} text-6xl`}
          style={{
            WebkitTextStroke: "2px #0c1feb",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Register
        </h2>
        <form className="RegisterForm flex flex-col items-center gap-7 w-full px-4">
          <input
            type="email"
            className="w-full h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center"
            placeholder="Email"
          />
          <input
            type="number"
            className="w-full h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center"
            placeholder="Phone Number"
          />
          <input
            type="password"
            className="w-full h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center"
            placeholder="Password"
          />
          <input
            type="password"
            className="w-full h-[50px] rounded-md border-[2px] border-[#0c1feb] bg-transparent outline-none focus:border-[3px] px-4 text-center"
            placeholder="Confirm Password"
          />
         
          <button className="w-full bg-[#0c1feb] h-[45px] flex justify-center items-center rounded-md text-xl">
            <p className={rowdies1.className}>Register</p>
          </button>
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
        <div className=" w-full flex flex-col gap-6 px-4 pb-10">
          <div className="w-full h-[45px] bg-[#0c1feb] text-white flex gap-2 items-center justify-center rounded-md ">
            <div>
              <FaGoogle />
            </div>
            <p className={`${rowdies1.className}`}>Register with Google</p>
          </div>
          <div className="w-full h-[45px] bg-[#0c1feb] text-white flex gap-2 items-center justify-center rounded-md ">
            <div>
            <FaFacebook />
            </div>
            <p className={`${rowdies1.className}`}>Register with Facebook</p>
          </div>
          <div className="w-full h-[45px] bg-[#0c1feb] text-white flex gap-2 items-center justify-center rounded-md ">
            <div>
            <FaGithub />
            </div>
            <p className={`${rowdies1.className}`}>Register with Github</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
