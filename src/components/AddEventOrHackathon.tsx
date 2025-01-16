import { Rowdies } from "next/font/google";

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

const AddEventOrHackathon = () => {
  return (
    <div className="w-screen min-h-screen py-10 px-5">
      <div className="w-full h-[200px] flex flex-col gap-1  py-5">
        <p
          className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent mb-3 text-5xl`}
        >
          Create Event or Hackathon
        </p>
        <p className="text-xl text-zinc-400">
          Fill in the details to create your event
        </p>
      </div>
      <div>
        <form className="flex flex-col gap-3 w-full ">
          <div className="w-full h-[400px] flex justify-between gap-20">
            <div className="w-1/2 h-full  flex flex-col justify-between">
              <div className="text-white  flex flex-col gap-1">
                <label htmlFor="eventName">Event Name</label>
                <input
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400  px-4"
                  placeholder="Enter event name"
                />
              </div>
              <div className="text-white  flex flex-col gap-1">
                <label htmlFor="eventName">Date</label>
                <input
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400  px-4"
                  placeholder="Enter Date or Date Range"
                />
              </div>
              <div className="text-white  flex flex-col gap-1">
                <label htmlFor="eventName">Type of Event</label>
                <input
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400  px-4"
                  placeholder="Enter type of event"
                />
              </div>
            </div>
            <div className="w-1/2 h-full justify-between pr-3 flex flex-col gap-6">
              <div className="text-white  flex flex-col gap-1">
                <label htmlFor="eventName">Short Description</label>
                <input
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400  px-4"
                  placeholder="Enter Short Description"
                />
                <p className="text-xs text-zinc-400">Max 30 Characters</p>
              </div>
              <div className=" flex flex-col gap-2">
                <p className="text-white">Mode of Event</p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    id="mode-online"
                    value="Online"
                    className="hidden peer"
                  />
                  <span className="w-5 h-5 rounded-full border-2 border-[#2563EB] bg-black peer-checked:bg-[#2563EB] peer-checked:border-[#1D4ED8]"></span>
                  <span className="text-zinc-400">Online</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    id="mode-online"
                    value="Offline"
                    className="hidden peer"
                  />
                  <span className="w-5 h-5 rounded-full border-2 border-[#2563EB] bg-black peer-checked:bg-[#2563EB] peer-checked:border-[#1D4ED8]"></span>
                  <span className="text-zinc-400">Offline</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    id="mode-online"
                    value="Hybrid"
                    className="hidden peer"
                  />
                  <span className="w-5 h-5 rounded-full border-2 border-[#2563EB] bg-black peer-checked:bg-[#2563EB] peer-checked:border-[#1D4ED8]"></span>
                  <span className="text-zinc-400">Hybrid</span>
                </label>
              </div>
              <div className="w-full h-[100px] rounded-lg border-[1px] border-blue-700 px-4 py-4 flex items-center justify-between bg-[#141519]">
                <div className="flex flex-col gap-1">
                  <p className="text-white text-xl font-semibold">
                    Open for Registration
                  </p>
                  <p className="text-xs text-zinc-400">
                    Is the event open for registration?
                  </p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500"></div>
                    <div className="absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-7 pr-3">
            <label htmlFor="theme" className="text-white">
              Theme
            </label>
            <input
              type="text"
              className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400  px-5"
              placeholder="Enter themes (commas-seperated)"
            />
            <p className="text-zinc-400 text-xs">
              Enter themes separated by commas
            </p>
          </div>
          <div className="w-full h-[190px] mt-10 pr-3  flex justify-between gap-20">
            <div className="w-1/2   flex flex-col justify-between">
              <div className="text-white  flex flex-col gap-1">
                <label htmlFor="LogoURL">Logo URL</label>
                <input
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400  px-4"
                  placeholder="Enter logo URL"
                />
              </div>
              <div className="text-white  flex flex-col gap-1">
                <label htmlFor="prize">Prize</label>
                <input
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400  px-4"
                  placeholder="Enter prize details"
                />
              </div>
            </div>
            <div className="w-1/2 h-full  flex flex-col justify-between">
              <div className="text-white  flex flex-col gap-1">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400  px-4"
                  placeholder="Enter location"
                />
              </div>
              <div className="text-white  flex flex-col gap-1">
                <label htmlFor="teamSize">Team Size</label>
                <input
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400  px-4"
                  placeholder="Enter team size"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-7 pr-3">
            <label htmlFor="theme" className="text-white">
              About Description
            </label>
            <textarea
              className="w-full min-h-[140px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400  px-3 py-2"
              placeholder="Enter about description"
            />
            <p className="text-zinc-400 text-xs">Minimum 50 Characters</p>
          </div>
          <div className="flex flex-col gap-1 mt-7 pr-3">
            <label htmlFor="theme" className="text-white">
              Event poster URL
            </label>
            <input
              type="text"
              className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400  px-5"
              placeholder="Enter event Poster URL"
            />
            <p className="text-zinc-400 text-xs">Enter event poster URL</p>
          </div>
          <div className="w-full  mt-10 pr-3  flex justify-between gap-20">
            <div className="w-1/2   flex flex-col justify-between">
              <div className="text-white  flex flex-col gap-2">
                <label htmlFor="instagramUrl">Instagram URL(Optional)</label>
                <input
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400  px-4"
                  placeholder="Enter instgarm URL"
                />
              </div>
            </div>
            <div className="w-1/2 h-full  flex flex-col justify-between">
              <div className="text-white  flex flex-col gap-2">
                <label htmlFor="twitterUrl">Twitter URL(Optional)</label>
                <input
                  type="text"
                  className="w-full h-[50px] bg-[#141519] rounded-lg focus:outline-none border-[1px] border-blue-700 focus:border-[2px] placeholder:text-zinc-400  px-4"
                  placeholder="Enter twitter URL"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventOrHackathon;
