import { createSlice } from "@reduxjs/toolkit";

interface ApplicationBoxState {
  isBoxVisible: boolean;
}

const initialState: ApplicationBoxState = {
  isBoxVisible: false,
};
const applicationBoxSlice = createSlice({
  name: "applicationBox",
  initialState,
  reducers: {
    setIsBoxVisible: (state) => {
      state.isBoxVisible = !state.isBoxVisible;
    },
  },
});

export const applicationBoxActions = applicationBoxSlice.actions;

export default applicationBoxSlice;
