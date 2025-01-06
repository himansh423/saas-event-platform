import { Rowdies } from "next/font/google";
import BlogCards from "./BlogCards";
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

      <div className="CardsContainer w-full grid grid-cols-3 px-5 py-20 mt-10 ">
       { [1,2,3,4,5,6].map((item) => (<BlogCards/>))}
      </div>
    </div>
  );
};

export default BlogPage;
