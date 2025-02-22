import { createSlice } from "@reduxjs/toolkit";

interface SavedEventAndHackathon {
  _id:string;
  shortDescription:string,
  name: string;
  dateEnd: Date;
  prize:string
  dateStart: Date;
  isOpen: boolean;
  location: string;
  modeOfEvent: string;
  theme: [string];
}

interface CreatedteamUp {
  _id: string;
  hackName: string;
  createdBy: {
    firstName: string;
    lastName: string;
  };

  description: string;
  location: string;
  email: string;
  mobileNumber: string;
  dateStart: Date;
  dateEnd: Date;
  eventOrHackathonUrl: string;
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
    createdTeamUp: [CreatedteamUp];
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
