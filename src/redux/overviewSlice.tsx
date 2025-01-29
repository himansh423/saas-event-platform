import { createSlice } from "@reduxjs/toolkit";

interface OverviewState {
  overviewData: {
    name: string;
    shortDescription: string;
    date: string;
    modeOfEvent: string;
    typeOfEvent: string;
    isOpen: boolean;
    theme: string[];
    logo: string;
    location: string;
    prize: string;
    teamSize: string;
    aboutDescriptions: string;
    eventPoster: string;
    instagramLink: string;
    twitterLink: string;
    eventOrHackathonUrl: string;
  } | null;
}

const initialState: OverviewState = {
  overviewData: {
    name: "",
    shortDescription: "",
    date: "",
    modeOfEvent: "",
    typeOfEvent: "",
    isOpen: false,
    theme: [],
    logo: "",
    location: "",
    prize: "",
    teamSize: "",
    aboutDescriptions: "",
    eventPoster: "",
    instagramLink: "",
    twitterLink: "",
    eventOrHackathonUrl: "",
  },
};

const overviewSlice = createSlice({
  name: "Overview",
  initialState,
  reducers: {
    setOverviewData: (state, action) => {
      const { data } = action.payload;
      state.overviewData = data;
    },
  },
});

export const overviewAction = overviewSlice.actions;

export default overviewSlice;
