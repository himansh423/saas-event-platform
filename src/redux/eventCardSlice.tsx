import { createSlice } from "@reduxjs/toolkit";

interface EventCardState {
  isFavorite: boolean;
  showModal: boolean;
}

const initialState: EventCardState = {
  isFavorite: false,
  showModal: false,
};

const eventCardSlice = createSlice({
  name: "eventCard",
  initialState,
  reducers: {
    setIsFavourite: (state) => {
      state.isFavorite = !state.isFavorite;
    },
    setShowModal: (state) => {
      state.showModal = !state.showModal;
    }
  },
});

export const eventCardActions = eventCardSlice.actions;

export default eventCardSlice;
