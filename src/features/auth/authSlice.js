import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../../actions/authAction";

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state) => {
      state.loading = false;
      state.error = null;
    },
    [registerUser.rejected]: (state) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default authSlice.reducer;
