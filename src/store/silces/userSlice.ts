import * as userService from "@/services/userService";
import * as authService from "@/services/authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { IForm } from "@/types";
import { IUserModel } from "@/models/user";
import { IAuthModel } from "@/models/auth";

interface IUserState {
  accessToken: string;
  refreshToken: string;
  error?: string;
  status: "fetching" | "success" | "failed" | "init";
  user: IUserModel | null;
  isAuthenticated: boolean;
}

const initialState: IUserState = {
  accessToken: "",
  refreshToken: "",
  status: "init",
  user: null,
  error: "",
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

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (payload: IAuthModel) => {
    return authService.refreshToken(payload);
  }
);

export const logout = createAsyncThunk("user/logout", async () => ({}));

export const getCurrentUser = createAsyncThunk("user/me", async () => {
  return userService.getCurrentUser();
});

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
      const { accessToken, refreshToken } = action.payload;
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

    // Refresh token case
    builder.addCase(refreshToken.pending, (state, action) => {
      state.status = "fetching";
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.status = "success";
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.status = "failed";
      state.accessToken = "";
      state.refreshToken = "";
      state.isAuthenticated = false;
      state.user = null;
    });

    // Logout case
    builder.addCase(logout.pending, (state, action) => {
      state.status = "fetching";
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.status = "success";
      state.accessToken = "";
      state.refreshToken = "";
      state.user = null;
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
      const { user } = action.payload;
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
