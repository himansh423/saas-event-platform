import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OverviewState {
  tab: "overview" | "prizes" | "schedule";
}

const initialState: OverviewState = {
  tab: "overview",
};

const overviewPageSlice = createSlice({
  name: "overview",
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<OverviewState["tab"]>) => {
      state.tab = action.payload;
    },
  },
});

export const overviewPageActions = overviewPageSlice.actions;

export default overviewPageSlice; 
