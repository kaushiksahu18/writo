import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {AuthState} from '../types/user'

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    accessToken: null,
    refreshToken: null,
    fullName: "",
    email: "",
    userId: "",
    isLoggedIn: false
  },
  error: null,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: AuthState['user'] }>) {
      const {
        accessToken,
        refreshToken,
        fullName,
        email,
        userId
      } = action.payload.user;
      state.isAuthenticated = true;
      state.user = {
        accessToken,
        refreshToken,
        fullName,
        email,
        userId,
        isLoggedIn: true
      };
      state.error = null;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = initialState.user;
    },
    logout(state) {
      Object.assign(state, initialState);
    },
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action: PayloadAction<{ fullName: string; email: string }>) {
      state.user.fullName = action.payload.fullName;
      state.user.email = action.payload.email;
    },
  },
});

export const { setIsAuthenticated, login, loginFailed, logout, setUser } = userReducer.actions;
export default userReducer.reducer;
