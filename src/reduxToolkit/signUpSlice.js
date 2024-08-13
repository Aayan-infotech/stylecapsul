import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const signup = createAsyncThunk(
  "signup/signupUser",
  async (userData) => {
    const response = await axios.post("/api/auth/signup", userData);
    console.log(response.data)
    return response.data;
  }
);

const userSignUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSignUpSlice.reducer;
