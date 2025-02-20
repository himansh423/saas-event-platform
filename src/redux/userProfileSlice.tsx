import { createSlice } from "@reduxjs/toolkit";

interface SavedEventAndHackathon {
  name: string;
  dateEnd: string;
  dateStart: Date;
  isOpen: boolean;
  location: string;
  modeOfEvent: string;
  theme: [string];
}

interface UserProfileState {
  loggedInUser: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    profilePicture: string;
    email: string;
    phoneNumber: string;
    bio: string;
    location: string;
    savedEventAndHackathon: [SavedEventAndHackathon];
  } | null;
}

const initialState: UserProfileState = {
  loggedInUser: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setProfileData: (state, actions) => {
      const { data } = actions.payload;
      state.loggedInUser = data;
    },
  },
});

export const userProfileActions = userProfileSlice.actions;

export default userProfileSlice;
