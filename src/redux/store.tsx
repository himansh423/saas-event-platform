import { configureStore } from "@reduxjs/toolkit";
import heroSlice from "./heroSlice";
import overviewPageSlice from "./overviewPageSlice";
import SearchAndFilterBoxSlice from "./SearchAndFilterBoxSlice";
import eventCardSlice from "./eventCardSlice";
import navbarSlice from "./navbarSlice";
import emailSlice from "./emailSlice";





export const store = configureStore({
  reducer: {
    hero:heroSlice.reducer,
    overviewTab:overviewPageSlice.reducer,
    searchAndFilter:SearchAndFilterBoxSlice.reducer,
    eventCard: eventCardSlice.reducer,
    navbar:navbarSlice.reducer,
    email:emailSlice.reducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;