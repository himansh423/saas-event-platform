import { createSlice } from "@reduxjs/toolkit";

interface SearchAndFilterState {
  isfilterOpen:boolean;
}

const initialState:SearchAndFilterState = {
   isfilterOpen:false,
}

const SearchAndFilterBoxSlice = createSlice({
  name:"SearchAndFilter",
  initialState,
  reducers:{
    setFilterOpen:(state) => {
      state.isfilterOpen = !state.isfilterOpen;
    }
  }
})


export const SearchAndFilterBoxAction = SearchAndFilterBoxSlice.actions;

export default SearchAndFilterBoxSlice;