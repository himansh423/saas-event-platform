import { configureStore } from "@reduxjs/toolkit";
import heroSlice from "./heroSlice";
import overviewPageSlice from "./overviewPageSlice";
import SearchAndFilterBoxSlice from "./SearchAndFilterBoxSlice";
import eventCardSlice from "./eventCardSlice";





export const store = configureStore({
  reducer: {
    hero:heroSlice.reducer,
    overviewTab:overviewPageSlice.reducer,
    searchAndFilter:SearchAndFilterBoxSlice.reducer,
    eventCard: eventCardSlice.reducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;