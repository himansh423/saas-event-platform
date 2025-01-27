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
      state.savedItems = action.payload; 
    },
  },
});

export const eventCardActions = eventCardSlice.actions;

export default eventCardSlice;