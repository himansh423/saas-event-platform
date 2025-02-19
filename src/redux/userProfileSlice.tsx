import { createSlice } from "@reduxjs/toolkit";

interface UserProfileState {
  loggedInUser: {
    firstName: string;
    lastName: string;
    username: string;
    profilePicture: string;
    email: string;
    phoneNumber: string;
    bio: string;
    location:string
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
