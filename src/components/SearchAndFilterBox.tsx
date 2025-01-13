"use client";

import { Rowdies } from "next/font/google";
import { FaCheck, FaFilter, FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { SearchAndFilterBoxAction } from "@/redux/SearchAndFilterBoxSlice";
import { AnimatePresence, motion } from "framer-motion";
import { RootState } from "@/redux/store";

const rowdies = Rowdies({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});

const filters = ["Default", "Online", "Offline"];

const SearchAndFilterBox = () => {
  const dispatch = useDispatch();
  const { isfilterOpen, selectedFilters } = useSelector(
    (store: RootState) => store.searchAndFilter
  );

  const handleIsFilterOpen = () => {
    dispatch(SearchAndFilterBoxAction.setFilterOpen());
  };

  const toggleFilter = (filter: string) => {
    dispatch(SearchAndFilterBoxAction.toggleFilter(filter));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gray-950 rounded-2xl border border-[#0c1feb] p-6 shadow-lg shadow-[#0c1feb]/20">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Filter Button */}
          <div className="relative">
            <div
              onClick={handleIsFilterOpen}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-xl border-[#0c1feb] hover:bg-[#0c1feb] bg-[#0c1feb] hover:text-white transition-colors"
              >
                <FaFilter className="w-5 h-5" />
                <span className="sr-only">Filter</span>
              </Button>
              <span
                className={`${rowdies.className} text-xl hidden md:inline text-white`}
              >
                Filter
              </span>
            </div>

            {/* Filter Dropdown */}
            <AnimatePresence>
              {isfilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gray-950 absolute mt-[10px] left-0 w-[300px] rounded-lg border border-[#0c1feb] px-4 py-4 flex flex-col gap-2 overflow-y-scroll no-scrollbar z-10"
                >
                  {filters.map((filter) => (
                    <div
                      key={filter}
                      className="w-full h-[50px] bg-gray-900 rounded-md text-xl text-white flex items-center px-2 justify-between cursor-pointer"
                      onClick={() => toggleFilter(filter)}
                    >
                      <p className={`${rowdies.className}`}>{filter}</p>
                      <div
                        className={`h-[30px] w-[30px] flex items-center justify-center rounded-sm border-[#0c1feb] border ${
                          selectedFilters.includes(filter)
                            ? "bg-gray-800 text-[#0c1feb]"
                            : "bg-transparent text-transparent"
                        }`}
                      >
                        <FaCheck />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Input */}
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

          {/* Search Button */}
          <Button
            className={`${rowdies.className} w-full md:w-auto px-8 py-3 bg-[#0c1feb] hover:bg-[#0c1feb]/90 text-white rounded-xl transition-colors`}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilterBox;
