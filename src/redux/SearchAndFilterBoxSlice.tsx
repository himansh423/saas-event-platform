import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchAndFilterState {
  isfilterOpen: boolean;
  selectedFilters: string[];
}

const initialState: SearchAndFilterState = {
  isfilterOpen: false,
  selectedFilters: ["Default"],
};

const SearchAndFilterBoxSlice = createSlice({
  name: "SearchAndFilter",
  initialState,
  reducers: {
    setFilterOpen: (state) => {
      state.isfilterOpen = !state.isfilterOpen;
    },
    toggleFilter: (state, action: PayloadAction<string>) => {
      const filter = action.payload;
      if (state.selectedFilters.includes(filter)) {
        state.selectedFilters = state.selectedFilters.filter(
          (item) => item !== filter
        );
      } else {
        state.selectedFilters.push(filter);
      }
    },
  },
});

export const SearchAndFilterBoxAction = SearchAndFilterBoxSlice.actions;

export default SearchAndFilterBoxSlice;
