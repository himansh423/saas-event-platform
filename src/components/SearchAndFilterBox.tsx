import { Rowdies } from "next/font/google";
import { FaFilter, FaSearch } from "react-icons/fa"

const rowdies1 = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});
const SearchAndFilterBox = () => {
  return (
    <div>
      <div className="w-full h-[100px] text-white text-2xl flex bg-gray-950 rounded-[20px] px-5 border-[1px] border-[#0c1feb] items-center gap-8 py-6">
              <div className="flex items-center gap-1">
                <div>
                  <FaFilter />
                </div>
                <p className={`${rowdies1.className}`}>Filter</p>
              </div>
              <div className="h-full flex-1 relative">
                <div className="absolute left-3 top-[50%] translate-y-[-50%] text-white z-20">
                  <FaSearch />
                </div>
                <input
                  type="text"
                  placeholder="Type to begin search"
                  className={`${rowdies1.className} h-full absolute w-full px-11 placeholder:text-xl pb-1 focus:outline-none flex-1 bg-gray-900  rounded-md border-[1px] border-[#0c1feb]`}
                />
              </div>
              <div className="h-full w-[150px] bg-[#0c1feb] text-white rounded-md text-xl flex items-center justify-center">
                <span className={rowdies1.className}>Search</span>
              </div>
            </div>
    </div>
  )
}

export default SearchAndFilterBox
