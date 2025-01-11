import { configureStore } from "@reduxjs/toolkit";
import heroSlice from "./heroSlice";
import overviewPageSlice from "./overviewPageSlice";
import SearchAndFilterBoxSlice from "./SearchAndFilterBoxSlice";





export const store = configureStore({
  reducer: {
    hero:heroSlice.reducer,
    overviewTab:overviewPageSlice.reducer,
    searchAndFilter:SearchAndFilterBoxSlice.reducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;