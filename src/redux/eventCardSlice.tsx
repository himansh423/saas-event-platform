import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EventCardState {
  savedItems: string[];
  showModal: boolean;
}

const initialState: EventCardState = {
  savedItems: [],
  showModal: false,
};

const eventCardSlice = createSlice({
  name: "eventCard",
  initialState,
  reducers: {
    toggleSavedItem: (state, action: PayloadAction<string>) => {
      if (!state.savedItems) state.savedItems = []; 
      const id = action.payload;
      const index = state.savedItems.indexOf(id);
      if (index === -1) {
        state.savedItems.push(id);
      } else {
        state.savedItems.splice(index, 1);
      }
    },
    setShowModal: (state) => {
      state.showModal = !state.showModal;
    },
    setSavedItems: (state, action: PayloadAction<string[]>) => {
      state.savedItems = Array.isArray(action.payload) ? action.payload : []; // Ensure it's always an array
    },
  },
});

export const eventCardActions = eventCardSlice.actions;

export default eventCardSlice;
