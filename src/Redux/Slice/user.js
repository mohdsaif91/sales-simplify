import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    user: sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : null,
  },
  reducers: {
    loginUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    logoutUser: (state, action) => {
      sessionStorage.clear();
      return {
        ...state,
        user: null,
      };
    },
  },
});

export const userReducer = user.reducer;
export const { loginUser, logoutUser } = user.actions;
