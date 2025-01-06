import Image from "next/image"
import { FaRegClock } from "react-icons/fa"
import { MdDateRange } from "react-icons/md"
import { Rowdies } from "next/font/google";
import blogImg from "../../public/blog.webp";
const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

const BlogCards = () => {
  return (
    <div>
      <div className="Cards overflow-hidden w-[430px] h-[500px] border-[1px] border-zinc-400 bg-gray-900 rounded-md flex flex-col justify-between mb-14">
          <div className="relative w-full h-[210px]">
            <Image
              src={blogImg.src}
              alt="blog Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="w-full  p-5  flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="px-[4px] h-[30px] bg-gradient-to-r from-blue-500 to-[#0c1feb] flex justify-center items-center text-[12px] rounded-lg text-[#e4e0e0]">
                <p className={rowdies1.className}>BLOCKCHAIN</p>
              </div>
              <div className="px-[4px] h-[30px] bg-gradient-to-r from-blue-500 to-[#0c1feb] flex justify-center items-center text-[12px] rounded-lg text-[#e4e0e0]">
                <p className={rowdies1.className}>AWS</p>
              </div>
              <div className="px-[4px] h-[30px] bg-gradient-to-r from-blue-500 to-[#0c1feb] flex justify-center items-center text-[12px] rounded-lg text-[#e4e0e0]">
                <p className={rowdies1.className}>SERVERLESS</p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <p
                className={`${rowdies1.className} text-2xl bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
              >
                Getting Started with Next.js 13
              </p>
              <p className="text-zinc-400">
                Learn how to build modern web applications with Next.js 13 and
                its powerful features.
              </p>
            </div>
            <div className="w-full flex gap-4 text-[15px]">
              <div className="flex gap-2 items-center text-zinc-400">
                <div className="mt-[0.2px]">
                  <MdDateRange />
                </div>
                <p>2023-05-15</p>
              </div>
              <div className="flex gap-2 items-center text-zinc-400">
                <div className="mt-[0.2px]">
                  <FaRegClock />
                </div>
                <p>5 min read</p>
              </div>
            </div>
          </div>
          <div className="w-full h-[60px] bg-black  px-5 flex items-center text-[16px] ">
            <p className="bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent hover:bg-gradient-to-l font-semibold">
              Read more →
            </p>
          </div>
        </div>
    </div>
  )
}

export default BlogCards
