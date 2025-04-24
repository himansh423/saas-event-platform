import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApplicationBoxState {
  visibleBoxId: string | null;
}

const initialState: ApplicationBoxState = {
  visibleBoxId: null,
};

const applicationBoxSlice = createSlice({
  name: "applicationBox",
  initialState,
  reducers: {
    setVisibleBox: (state, action: PayloadAction<string | null>) => {
      state.visibleBoxId = action.payload;
    },
    closeBox: (state) => {
      state.visibleBoxId = null;
    },
  },
});

export const applicationBoxActions = applicationBoxSlice.actions;

export default applicationBoxSlice;