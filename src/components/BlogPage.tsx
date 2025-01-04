import { Rowdies } from "next/font/google";
import Image from "next/image";
import blogImg from "../../public/blog.webp";
const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
const BlogPage = () => {
  return (
    <div className="w-screen min-h-screen bg-black">
      <div className="w-full flex flex-col gap-4 items-center pt-10">
        <h1
          className={`${rowdies1.className} bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent text-7xl `}
        >
          Blog
        </h1>
        <p className="text-zinc-400 text-xl">
          Discover the latest insights, tutorials, and updates from our team.
        </p>
      </div>

      <div className="CardsContainer w-full grid grid-cols-3 px-5 py-20 mt-10">
        <div className=" Cards overflow-hidden w-[430px] h-[500px] border-[1px] border-zinc-400 bg-gray-900 rounded-md flex flex-col">
          <div className="relative w-full h-[210px]">
            <Image
              src={blogImg.src}
              alt="blog Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="w-full h-[250px] p-5  flex flex-col gap-4">
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
              <p className="text-zinc-400">Learn how to build modern web applications with Next.js 13 and its powerful features.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
