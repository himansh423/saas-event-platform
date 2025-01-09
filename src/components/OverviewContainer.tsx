
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Rowdies } from "next/font/google";
const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
const OverviewContainer = () => {
  return (
    <div>
      <div className="OverviewContainer min-h-[100vh] w-[75vw] flex flex-col px-5 py-10 gap-10">
          <div className="w-full min-h-[400px] bg-gray-950 rounded-lg  px-5 py-4 pb-6 flex flex-col gap-4">
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
          <div className="w-full min-h-[400px]  rounded-lg  px-5 py-4 pb-6 flex flex-col gap-7">
            <p
              className={`${rowdies1.className} text-4xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
            >
              Tracks
            </p>
            <div className="w-full  bg-gray-950 rounded-md border border-zinc-400 px-4 py-5 flex flex-col gap-2">
              <p className={`${rowdies1.className} text-3xl text-white`}>
                DeFi
              </p>
              <p className="text-zinc-400">
                Reinvent financial systems and shape the future of decentralized
                finance.
              </p>
            </div>
            <div className="w-full  bg-gray-950 rounded-md border border-zinc-400 px-4 py-5 flex flex-col gap-2">
              <p className={`${rowdies1.className} text-3xl text-white`}>
                Public Goods
              </p>
              <p className="text-zinc-400">
                Build solutions that drive transparency, accessibility, and
                equity.
              </p>
            </div>
            <div className="w-full  bg-gray-950 rounded-md border border-zinc-400 px-4 py-5 flex flex-col gap-2">
              <p className={`${rowdies1.className} text-3xl text-white`}>
                Open Innovation
              </p>
              <p className="text-zinc-400">
                Empower communities to solve challenges through collaboration
                and creativity.
              </p>
            </div>
          </div>
          <div className="w-full min-h-[400px]  rounded-lg  px-5 py-4 pb-6 flex flex-col gap-7">
            <p
              className={`${rowdies1.className} text-4xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
            >
              Judging Criteria
            </p>
            <div className="w-full h-[84px]  bg-gray-950 rounded-md border border-zinc-400 px-4 py-3 flex items-center gap-2">
              <div className="h-full w-[60px] bg-gray-900 flex items-center justify-center rounded-full">
                <p
                  className={`${rowdies1.className}  text-[25px] bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
                >
                  1
                </p>
              </div>
              <div className="flex flex-col">
                <p className={`${rowdies1.className} text-[18px] text-white`}>
                  Innovation
                </p>
                <p className="text-[14px] text-zinc-400">
                  Originality and creative problem-solving.
                </p>
              </div>
            </div>
            <div className="w-full h-[84px]  bg-gray-950 rounded-md border border-zinc-400 px-4 py-3 flex items-center gap-2">
              <div className="h-full w-[60px] bg-gray-900 flex items-center justify-center rounded-full">
                <p
                  className={`${rowdies1.className}  text-[25px] bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent `}
                >
                  2
                </p>
              </div>
              <div className="flex flex-col">
                <p className={`${rowdies1.className} text-[18px] text-white`}>
                  Impact
                </p>
                <p className="text-[14px] text-zinc-400">
                  Relevance and potential for real-world adoption.
                </p>
              </div>
            </div>

            <div className="w-full h-[84px]  bg-gray-950 rounded-md border border-zinc-400 px-4 py-3 flex items-center gap-2">
              <div className="h-full w-[60px] bg-gray-900 flex items-center justify-center rounded-full">
                <p
                  className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent text-[25px] `}
                >
                  3
                </p>
              </div>
              <div className="flex flex-col">
                <p className={`${rowdies1.className} text-[18px] text-white`}>
                  Technical Execution
                </p>
                <p className="text-[14px] text-zinc-400">
                  Code quality, scalability, and functionality.
                </p>
              </div>
            </div>
            <div className="w-full h-[84px]  bg-gray-950 rounded-md border border-zinc-400 px-4 py-3 flex items-center gap-2">
              <div className="h-full w-[60px] bg-gray-900 flex items-center justify-center rounded-full">
                <p
                  className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent text-[25px] `}
                >
                  4
                </p>
              </div>
              <div className="flex flex-col">
                <p className={`${rowdies1.className} text-[18px] text-white`}>
                  User Experience
                </p>
                <p className="text-[14px] text-zinc-400">
                  Design and usability.
                </p>
              </div>
            </div>
            <div className="w-full h-[84px]  bg-gray-950 rounded-md border border-zinc-400 px-4 py-3 flex items-center gap-2">
              <div className="h-full w-[60px] bg-gray-900 flex items-center justify-center rounded-full">
                <p
                  className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent text-[25px] `}
                >
                  5
                </p>
              </div>
              <div className="flex flex-col">
                <p className={`${rowdies1.className} text-[18px] text-white`}>
                  Presentation
                </p>
                <p className="text-[14px] text-zinc-400">
                  Clarity, delivery, and vision.
                </p>
              </div>
            </div>
          </div>
          <div className="min-h-screen bg-black p-8">
            <h2 className="text-[#60A5FA] text-3xl font-bold mb-8">FAQs</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem
                value="item-1"
                className="border-b border-white/10"
              >
                <AccordionTrigger className="text-white text-xl hover:no-underline">
                  What is the team size?
                </AccordionTrigger>
                <AccordionContent className="text-white/80 text-lg">
                  Teams can have 3-5 members.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="border-b border-white/10"
              >
                <AccordionTrigger className="text-white text-xl hover:no-underline">
                  Registration costs?
                </AccordionTrigger>
                <AccordionContent className="text-white/80 text-lg">
                  Please contact us for registration costs and payment details.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="border-b border-white/10"
              >
                <AccordionTrigger className="text-white text-xl hover:no-underline">
                  Where is the event happening?
                </AccordionTrigger>
                <AccordionContent className="text-white/80 text-lg">
                  The event location and venue details will be shared with
                  registered participants.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
    </div>
  )
}

export default OverviewContainer
