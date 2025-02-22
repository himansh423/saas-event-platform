import { createSlice } from "@reduxjs/toolkit";
import teamUpSlice from "./teamUpSlice";

const initialState = {};
const myTeamUpSlice = createSlice({
  name: "myTeamUp",
  initialState,
  reducers: {},
});

export const myTeamUpAction = myTeamUpSlice.actions;

export default teamUpSlice;
