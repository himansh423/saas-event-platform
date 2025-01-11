'use client'

import { Rowdies } from 'next/font/google'
import { FaFilter, FaSearch } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const rowdies = Rowdies({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
})

const SearchAndFilterBox = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gray-950 rounded-2xl border border-[#0c1feb] p-6 shadow-lg shadow-[#0c1feb]/20">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-3 ">
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-xl border-[#0c1feb] hover:bg-[#0c1feb] bg-[#0c1feb] hover:text-white transition-colors"
            >
              <FaFilter className="w-5 h-5" />
              <span className="sr-only">Filter</span>
            </Button>
            <span className={`${rowdies.className} text-xl hidden md:inline text-white`}>Filter</span>
          </div>
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <FaSearch className="w-5 h-5" />
            </div>
            <Input
              type="text"
              placeholder="Type to begin search"
              className={`${rowdies.className} w-full pl-12 pr-4 py-3 bg-gray-900 border-[#0c1feb] text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#0c1feb] focus:border-transparent rounded-xl`}
            />
          </div>
          <Button
            className={`${rowdies.className} w-full md:w-auto px-8 py-3 bg-[#0c1feb] hover:bg-[#0c1feb]/90 text-white rounded-xl transition-colors`}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SearchAndFilterBox

