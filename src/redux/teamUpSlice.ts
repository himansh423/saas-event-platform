import { createSlice } from "@reduxjs/toolkit";

interface TeamUpState {
  userId: string;
  appliedTeamUps: { [key: string]: boolean };  // Map teamUp IDs to application status
}

const initialState: TeamUpState = {
  userId: "",
  appliedTeamUps: {},
};

const teamUpSlice = createSlice({
  name: "teamUp",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      const { id } = action.payload;
      state.userId = id;
    },
    setTeamUpApplicationStatus: (state, action) => {
      const { teamUpId, isApplied } = action.payload;
      state.appliedTeamUps[teamUpId] = isApplied;
    },
  },
});

export const teamUpAction = teamUpSlice.actions;

export default teamUpSlice;