import { Rowdies } from "next/font/google";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
const Footer = () => {
  return (
    <footer className="w-screen h-screen py-8 flex flex-col  bg-black px-10 border-t-[2px] border-[#0c1feb]">
      <div className=" flex justify-between w-full h-full">
        <div className=" w-1/2  h-full flex flex-col justify-between pb-6">
          <div>
            <p
              className={`${rowdies1.className} text-4xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent mb-2`}
            >
              BrandName
            </p>
            <p className="text-gray-400">
              Empowering event organizers with cutting-edge SaaS solutions.
            </p>
            <div className="flex gap-3 items-center mt-3 text-gray-400">
              <div className="hover:text-white">
                <Facebook />
              </div>
              <div className="hover:text-white">
                <Twitter />
              </div>
              <div className="hover:text-white">
                <Instagram />
              </div>
              <div className="hover:text-white">
                <Linkedin />
              </div>
            </div>
          </div>
          <div className="text-white flex flex-col gap-3">
            <p className={`${rowdies1.className} text-2xl`}>Resources</p>
            <div className="flex flex-col gap-2 text-zinc-400">
              <p className="hover:bg-gradient-to-r hover:from-blue-400 hover:to-[#0c1feb] hover:bg-clip-text hover:text-transparent">Help</p>
              <p className="hover:bg-gradient-to-r hover:from-blue-400 hover:to-[#0c1feb] hover:bg-clip-text hover:text-transparent">Documentation</p>
              <p className="hover:bg-gradient-to-r hover:from-blue-400 hover:to-[#0c1feb] hover:bg-clip-text hover:text-transparent">Brand Assets</p>
              <p className="hover:bg-gradient-to-r hover:from-blue-400 hover:to-[#0c1feb] hover:bg-clip-text hover:text-transparent">Tutorials</p>
            </div>
          </div>
        </div>
        <div className=" w-1/2 text-white   h-full">
          <div className="flex flex-col gap-3 mb-14">
            <p className={`${rowdies1.className} text-2xl`}>Quick Links</p>
            <div className="flex flex-col gap-2 text-zinc-400">
              <p className="hover:bg-gradient-to-r hover:from-blue-400 hover:to-[#0c1feb] hover:bg-clip-text hover:text-transparent">Home</p>
              <p className="hover:bg-gradient-to-r hover:from-blue-400 hover:to-[#0c1feb] hover:bg-clip-text hover:text-transparent">Blog</p>
              <p className="hover:bg-gradient-to-r hover:from-blue-400 hover:to-[#0c1feb] hover:bg-clip-text hover:text-transparent">Events</p>
              <p className="hover:bg-gradient-to-r hover:from-blue-400 hover:to-[#0c1feb] hover:bg-clip-text hover:text-transparent">Hackathons</p>
              <p className="hover:bg-gradient-to-r hover:from-blue-400 hover:to-[#0c1feb] hover:bg-clip-text hover:text-transparent">Pricing</p>
              <p className="hover:bg-gradient-to-r hover:from-blue-400 hover:to-[#0c1feb] hover:bg-clip-text hover:text-transparent">Contact</p>
              <p className="hover:bg-gradient-to-r hover:from-blue-400 hover:to-[#0c1feb] hover:bg-clip-text hover:text-transparent">About</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className={`${rowdies1.className} text-2xl`}>
              Subscribe to Our Newsletter
            </p>
            <div className="flex items-center">
              <input
                type="text"
                className="h-[40px] w-[450px] bg-gray-900 px-3 py-0 rounded-tl-[10px] rounded-bl-[10px] border-l-[1px] border-t-[1px] border-b-[1px]  border-gray-600"
                placeholder="Enter Your Email"
              />
              <button className="h-[40px] w-[60px] bg-gradient-to-r from-blue-500 to-[#0c1feb] flex justify-center items-center rounded-tr-[10px] rounded-br-[10px] ">
                <div>
                  <Send />
                </div>
              </button>
            </div>
            <p className="text-xs text-zinc-400">
              Stay updated with our latest features and event planning tips.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-[120px] border-t-[1px] border-zinc-400 flex flex-col gap-3 text-zinc-400 items-center pt-7">
        <div>
          <p className="text-[16px]">© 2025 EventFlow. All rights reserved.</p>
        </div>
        <div className="flex gap-5">
          <p className="hover:bg-gradient-to-r hover:from-blue-400 hover:to-[#0c1feb] hover:bg-clip-text hover:text-transparent">Privacy Policy</p>
          <p className="hover:bg-gradient-to-r hover:from-blue-400 hover:to-[#0c1feb] hover:bg-clip-text hover:text-transparent">Terms & Conditions</p>
          <p className="hover:bg-gradient-to-r hover:from-blue-400 hover:to-[#0c1feb] hover:bg-clip-text hover:text-transparent">Cookie Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
