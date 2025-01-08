import Image from "next/image";
import banner from "../../public/hackathonImage.webp";
import { Rowdies } from "next/font/google";
import { MdDateRange, MdGroups, MdLocationPin } from "react-icons/md";
import { IoTrophyOutline } from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { Instagram, Twitter, X } from "lucide-react";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
const OverviewPage = () => {
  return (
    <div className="w-screen min-h-screen bg-black relative">
      <div className="HeroSection w-full h-[450px] flex items-end">
        <div className="w-1/2 h-full flex flex-col gap-2 justify-between  p-7">
          <div className="w-full h-[120px] bg-gray-950 border-[1px] border-zinc-400 rounded-lg flex items-center justify-center">
            <div className="w-[100px] h-[90px] bg-white">logo</div>
          </div>
          <div className="w-full  bg-gray-950 border-[1px] border-zinc-400 rounded-lg p-4">
            <div className="w-full flex flex-col gap-2 mb-7">
              <p
                className={`${rowdies1.className}  text-4xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
              >
                Reclaim Opensource Hack Week
              </p>
              <p className="text-zinc-400 text-xl">
                Reclaim Your Data Ownership
              </p>
            </div>
            <div className="w-full flex items-center gap-5">
              <div className="flex gap-1 items-center">
                <div className="text-xl text-blue-700">
                  <MdDateRange />
                </div>
                <p className="text-zinc-400">12 Nov - 21 Oct, 2025</p>
              </div>
              <div className="flex gap-1 items-center">
                <div className="text-xl text-blue-700">
                  <MdLocationPin />
                </div>
                <p className="text-zinc-400">New Delhi, India</p>
              </div>
              <div className="flex gap-1 items-center">
                <div className="text-xl text-blue-700">
                  <IoTrophyOutline />
                </div>
                <p className="text-zinc-400">$1999</p>
              </div>
            </div>
            <div className="w-full flex items-center mt-5 gap-1">
              <div className="text-blue-700 text-xl mt-[2px]">
                <LuClock />
              </div>
              <p className="text-zinc-400">Applications close in 2d:12h:57m</p>
            </div>
            <div className="w-full flex items-center mt-5 gap-1">
              <div className="text-blue-700 text-xl mt-[2px]">
                <MdGroups />
              </div>
              <p className="text-zinc-400">Team size: 3-5</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full p-7">
          <div className="w-full h-full  relative overflow-hidden rounded-lg border border-zinc-400">
            <Image
              src={banner.src}
              alt="banner"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      <div className="OptionNav sticky top-0 z-10 bg-black border-b border-zinc-800 w-full h-[60px] px-14 flex items-end gap-10">
        <div className="border-b-[3px] border-blue-700 h-[40px] w-fit text-blue-700 text-2xl">
          <p className={rowdies1.className}>Overview</p>
        </div>
        <div className="w-fit text-2xl text-zinc-400 h-[40px]">
          <p className={rowdies1.className}>Prizes</p>
        </div>
        <div className="w-fit text-2xl text-zinc-400 h-[40px]">
          <p className={rowdies1.className}>Schedule</p>
        </div>
      </div>
      <div className="w-screen min-h-screen flex">
        <div className="OverviewContainer min-h-[100vh] w-[75vw] flex flex-col px-5 py-10 gap-5">
          <div className="w-full min-h-[400px] bg-gray-950 rounded-lg border-zinc-400 border-[1px] px-5 py-4 pb-6 flex flex-col gap-4">
            <p
              className={`${rowdies1.className} text-4xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent `}
            >
              About the Hackathon
            </p>
            <p className="text-white text-xl">
              Where Geeks Battle with Code & Innovation! 🌟 Code Kshetra: Where
              Innovation Meets Madness🌟 Are you ready to unleash your inner
              tech wizard, survive on caffeine, and redefine what it means to
              innovate? Code Kshetra isn’t just a hackathon – it’s a 36-hour
              rollercoaster of creativity, chaos, and cutting-edge ideas, hosted
              by JIMS Sector-5 Rohini and the tech rebels at Geek Room. 📅 Mark
              your calendars: 🕒 When: 21st-22nd February 2024 📍 Where: JIMS
              Sector-5 Rohini, Near Rithala Metro Station 💰 What’s up for
              grabs? Prize Pool: INR 1,00,00,000+ (yes, you read that right!
              1Cr+ 😱) Cash Prizes: Worth INR 50,000+ 🤯 And, of course, eternal
              bragging rights 😉 🎢 What’s in store? Live Project Presentations
              (show ‘em what you’ve got). Idea Pitching (get those lightbulbs
              glowing). Guidance from expert judges and mentors (don’t sweat,
              they’re nice!). And of course Food, Games and Fun (because even we
              can't survive without these 😅). 🎁 Perks that scream ‘Why not?’
              Free swag (who doesn’t love free stuff?). Goodies, meals, and a
              comfy place to crash. Networking with industry big shots. A chance
              to make your LinkedIn profile the envy of all your friends 😁 Code
              Kshetra 2.0 isn’t just about building projects – it’s about
              building memories, having fun, and creating something the world
              didn’t know it needed. So grab your laptops, your wildest ideas,
              and maybe an extra charger or two. This isn’t just a hackathon –
              it’s Code Kshetra, a battleground where your ideas will rise, your
              dreams will thrive, and your sleep schedule will, well… not
              survive. See you there! 🚀
            </p>
          </div>
          <div className="w-full min-h-[400px] bg-gray-950 rounded-lg border border-zinc-400 px-5 py-4 pb-6 flex flex-col gap-7">
            <p
              className={`${rowdies1.className} text-4xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
            >
              Tracks
            </p>
            <div className="w-full  bg-black rounded-md border border-zinc-400 px-4 py-5 flex flex-col gap-2">
              <p className={`${rowdies1.className} text-3xl text-white`}>
                DeFi
              </p>
              <p className="text-zinc-400">
                Reinvent financial systems and shape the future of decentralized
                finance.
              </p>
            </div>
            <div className="w-full  bg-black rounded-md border border-zinc-400 px-4 py-5 flex flex-col gap-2">
              <p className={`${rowdies1.className} text-3xl text-white`}>
              Public Goods
              </p>
              <p className="text-zinc-400">
              Build solutions that drive transparency, accessibility, and equity.
              </p>
            </div>
            <div className="w-full  bg-black rounded-md border border-zinc-400 px-4 py-5 flex flex-col gap-2">
              <p className={`${rowdies1.className} text-3xl text-white`}>
              Open Innovation
              </p>
              <p className="text-zinc-400">
              Empower communities to solve challenges through collaboration and creativity.
              </p>
            </div>
            
          </div>
        </div>
        <div className="min-h-screen flex-1  px-4 py-10 flex flex-col items-center gap-7 pr-7 bg-black">
          <div className="w-full h-[200px] bg-black border-[1px] rounded-xl border-zinc-400 text-zinc-400 p-5 flex flex-col justify-between">
            <div>
              <p className="mb-2">APPLICATIONS CLOSE IN</p>
              <p
                className={`${rowdies1.className} text-4xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent `}
              >
                2d:12h:57m
              </p>
            </div>
            <div className="w-full h-[70px] bg-gradient-to-t hover:bg-gradient-to-l from-blue-400 to-[#0c1feb] rounded-md text-white flex items-center justify-center">
              <p className={`${rowdies1.className} text-xl`}>Apply Now</p>
            </div>
          </div>
          <div className="w-full h-[200px] bg-black border-[1px] rounded-xl border-zinc-400 text-zinc-400 p-5 flex flex-col justify-evenly gap-2">
            <div>
              <p>RUNS FROM</p>
              <p
                className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent `}
              >
                Jan 10 - 11, 2025
              </p>
            </div>
            <div>
              <p>HAPPENING</p>
              <p
                className={`${rowdies1.className}  bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent `}
              >
                DELHI, INDIA
              </p>
            </div>
            <div className="w-full flex items-center text-zinc-400 gap-4">
              <div className="hover:text-white">
                <Instagram />
              </div>
              <div className="hover:text-white">
                <Twitter />
              </div>
            </div>
          </div>
          <div className="w-full  bg-black border-[1px] rounded-xl border-zinc-400  p-5 flex flex-col justify-between">
            <p className={`${rowdies1.className} text-[20px] text-white mb-2`}>
              More Hackathons & Events
            </p>
            <div className="w-full flex flex-col gap-3">
              <div className="w-full h-[80px] bg-gray-900 px-4 py-4 rounded-md gap-3 flex items-center">
                <div className="w-[48px] h-full bg-white rounded-sm"></div>
                <div className="flex flex-col ">
                  <p className="text-white text-[17px] font-semibold">
                    HackHound 3.0
                  </p>
                  <p className="text-zinc-400 text-[14px]">Starts 27/02/2</p>
                </div>
              </div>
              <div className="w-full h-[80px] bg-gray-900 px-4 py-4 rounded-md gap-3 flex items-center">
                <div className="w-[48px] h-full bg-white rounded-sm"></div>
                <div className="flex flex-col ">
                  <p className="text-white text-[17px] font-semibold">
                    HackHound 3.0
                  </p>
                  <p className="text-zinc-400 text-[14px]">Starts 27/02/2</p>
                </div>
              </div>
              <div className="w-full h-[80px] bg-gray-900 px-4 py-4 rounded-md gap-3 flex items-center">
                <div className="w-[48px] h-full bg-white rounded-sm"></div>
                <div className="flex flex-col ">
                  <p className="text-white text-[17px] font-semibold">
                    HackHound 3.0
                  </p>
                  <p className="text-zinc-400 text-[14px]">Starts 27/02/2</p>
                </div>
              </div>
              <div className="w-full h-[80px] bg-gray-900 px-4 py-4 rounded-md gap-3 flex items-center">
                <div className="w-[48px] h-full bg-white rounded-sm"></div>
                <div className="flex flex-col ">
                  <p className="text-white text-[17px] font-semibold">
                    HackHound 3.0
                  </p>
                  <p className="text-zinc-400 text-[14px]">Starts 27/02/2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
