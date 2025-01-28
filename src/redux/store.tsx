import { configureStore } from "@reduxjs/toolkit";
import heroSlice from "./heroSlice";
import SearchAndFilterBoxSlice from "./SearchAndFilterBoxSlice";
import eventCardSlice from "./eventCardSlice";
import navbarSlice from "./navbarSlice";
import emailSlice from "./emailSlice";
import userSlice from "./userSlice";
import overviewSlice from "./overviewSlice";





export const store = configureStore({
  reducer: {
    hero:heroSlice.reducer,
    searchAndFilter:SearchAndFilterBoxSlice.reducer,
    eventCard: eventCardSlice.reducer,
    navbar:navbarSlice.reducer,
    email:emailSlice.reducer,
    user:userSlice.reducer,
    overview:overviewSlice.reducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;