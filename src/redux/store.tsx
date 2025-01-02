import { configureStore } from "@reduxjs/toolkit";
import heroSlice from "./heroSlice";





export const store = configureStore({
  reducer: {
    hero:heroSlice.reducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;