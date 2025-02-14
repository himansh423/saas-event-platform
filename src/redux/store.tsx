import { configureStore } from "@reduxjs/toolkit";
import heroSlice from "./heroSlice";
import SearchAndFilterBoxSlice from "./SearchAndFilterBoxSlice";
import eventCardSlice from "./eventCardSlice";
import navbarSlice from "./navbarSlice";
import emailSlice from "./emailSlice";
import userSlice from "./userSlice";
import overviewSlice from "./overviewSlice";
import teamUpSlice from "./teamUpSlice";
import importantQuestionsSlice from "./importantQuestionsSlice";
import loginSlice from "./loginSlice";
import forgotPasswordSlice from "./fogotPasswordSlice";





export const store = configureStore({
  reducer: {
    hero:heroSlice.reducer,
    searchAndFilter:SearchAndFilterBoxSlice.reducer,
    eventCard: eventCardSlice.reducer,
    navbar:navbarSlice.reducer,
    email:emailSlice.reducer,
    user:userSlice.reducer,
    overview:overviewSlice.reducer,
    teamup:teamUpSlice.reducer,
    importantQuestion:importantQuestionsSlice.reducer,
    login:loginSlice.reducer,
    forgotPassword:forgotPasswordSlice.reducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;