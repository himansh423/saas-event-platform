import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EventCardState {
  savedItems: string[]; // Array to store IDs of saved items
  showModal: boolean;
}

const initialState: EventCardState = {
  savedItems: [], // Initially, no items are saved
  showModal: false,
};

const eventCardSlice = createSlice({
  name: "eventCard",
  initialState,
  reducers: {
    toggleSavedItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.savedItems.indexOf(id);
      if (index === -1) {
        // If the item is not saved, add it to the savedItems array
        state.savedItems.push(id);
      } else {
        // If the item is already saved, remove it from the savedItems array
        state.savedItems.splice(index, 1);
      }
    },
    setShowModal: (state) => {
      state.showModal = !state.showModal;
    },
  },
});

export const eventCardActions = eventCardSlice.actions;

export default eventCardSlice;