import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  loggedInUser: {
    firstName: string;
    lastName: string;
    userId: string;
    email: string;
  } | null;
}

const initialState: UserState = {
  loggedInUser: null // Initialize as null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => { // ✅ Fixed parameter name
      const { data } = action.payload;
      state.loggedInUser = data;
      console.log(data)
    },
    clearUser: (state) => {
      state.loggedInUser = null;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;