import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  loggedInUser:{
    firstName:string,
    lastName:string,
    userId:string,
    email:string,

  }
}

const initialState:UserState = {
  loggedInUser:{
    firstName:"",
    lastName:"",
    userId:"",
    email:"",
  }
}
const userSlice = createSlice({
  name:"user",
  initialState,
  reducers: {
   setLoggedInUser: (state,actions) => {
    const {data} = actions.payload
    state.loggedInUser = data
   }
  }
})

export const userAction = userSlice.actions;

export default userSlice;