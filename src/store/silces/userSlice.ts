import * as userService from "@/services/userService";
import * as authService from "@/services/authService";
import { cookies } from "next/headers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { IForm } from "@/types";
import { IAuthModel } from "@/models/auth";
import { IUser } from "@/models/user";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/utils/constant";
import httpClient from "@/utils/httpClient";
import { AxiosRequestConfig } from "axios";

interface IUserState {
  accessToken: string;
  refreshToken: string;
  error?: string;
  status: "fetching" | "success" | "failed" | "init";
  user: IUser | null;
  isAuthenticated: boolean;
}

const initialState: IUserState = {
  accessToken: "",
  refreshToken: "",
  status: "init",
  user: null,
  isAuthenticated: false,
};

export const register = createAsyncThunk(
  "user/register",
  async (payload: IForm) => {
    return userService.createUser(payload);
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (payload: Omit<IForm, "name">) => {
    return authService.login(payload);
  }
);

export const logout = createAsyncThunk("user/logout", async () => ({}));

export const getCurrentUser = createAsyncThunk(
  "user/me",
  async (_, { getState }) => {
    httpClient.interceptors.request.use((config?: AxiosRequestConfig | any) => {
      const reducer = getState() as RootState;
      const { accessToken } = reducer.userReducer;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    return userService.getCurrentUser();
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register case
    builder.addCase(register.pending, (state, action) => {
      state.status = "fetching";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(register.rejected, (state, action) => {
      state.status = "failed";
    });

    // Login case
    builder.addCase(login.pending, (state, action) => {
      state.status = "fetching";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const { accessToken, refreshToken } = action.payload.result as IAuthModel;
      state.status = "success";
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
      state.accessToken = "";
      state.refreshToken = "";
      state.isAuthenticated = false;
    });

    // Logout case
    builder.addCase(logout.pending, (state, action) => {
      state.status = "fetching";
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.status = "success";
      state.accessToken = "";
      state.refreshToken = "";
      state.isAuthenticated = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.status = "failed";
    });

    // Get current user case
    builder.addCase(getCurrentUser.pending, (state, action) => {
      state.status = "fetching";
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      const { result } = action.payload;
      const { user } = result as { user: IUser };
      state.status = "success";
      state.user = user;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.status = "failed";
      state.isAuthenticated = false;
    });
  },
});

export const userState = (state: RootState) => state.userReducer;

export default userSlice.reducer;
