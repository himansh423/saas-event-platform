import { createSlice } from "@reduxjs/toolkit";

interface EventCardState {
  isSaved: boolean;
  showModal: boolean;
}

const initialState: EventCardState = {
  isSaved: false,
  showModal: false,
};

const eventCardSlice = createSlice({
  name: "eventCard",
  initialState,
  reducers: {
    setIsFavourite: (state) => {
      state.isSaved = !state.isSaved;
    },
    setShowModal: (state) => {
      state.showModal = !state.showModal;
    }
  },
});

export const eventCardActions = eventCardSlice.actions;

export default eventCardSlice;
