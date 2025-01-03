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
        <div className=" w-1/2  h-full flex flex-col justify-between">
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
          <div className="text-white">
            <p>Resources</p>
            <p></p>
          </div>
        </div>
        <div className="bg-yellow-100 w-1/2  h-full"></div>
      </div>
      <div className="w-full h-[120px]"></div>
    </footer>
  );
};

export default Footer;
