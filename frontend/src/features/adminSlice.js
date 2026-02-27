import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchSummary = createAsyncThunk(
  "admin/fetchSummary",
  async (_, { getState }) => {
    const user = getState().auth.user;

    const res = await api.get("/summary", {
      headers: {
        "x-user-id": user.id,
      },
    });

    return res.data;
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    groupedBookings: {},
    totals: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSummary.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.groupedBookings = action.payload.groupedBookings;
        state.totals = action.payload.totals;
        state.status = "succeeded";
      });
  },
});

export default adminSlice.reducer;
