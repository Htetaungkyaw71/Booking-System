import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchBookings = createAsyncThunk(
  "bookings/fetch",
  async (_, { getState }) => {
    const user = getState().auth.user;

    const res = await api.get("/bookings", {
      headers: {
        "x-user-id": user.id,
      },
    });

    return res.data;
  },
);

export const fetchmyBookings = createAsyncThunk(
  "mybookings/fetch",
  async (_, { getState }) => {
    const user = getState().auth.user;

    const res = await api.get("bookings/mybookings", {
      headers: {
        "x-user-id": user.id,
      },
    });

    return res.data;
  },
);

export const createBooking = createAsyncThunk(
  "bookings/create",
  async (data, { getState, rejectWithValue }) => {
    try {
      const user = getState().auth.user;

      const res = await api.post("/bookings", data, {
        headers: { "x-user-id": user.id },
      });

      return res.data;
    } catch (err) {
      if (err.response?.data?.error) {
        return rejectWithValue(err.response.data.error);
      }
      return rejectWithValue("Failed to create booking.");
    }
  },
);
export const deleteBooking = createAsyncThunk(
  "bookings/delete",
  async (id, { getState }) => {
    const user = getState().auth.user;

    await api.delete(`/bookings/${id}`, {
      headers: {
        "x-user-id": user.id,
      },
    });

    return id;
  },
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    allBookings: [],
    myBookings: [],
    loading: false,
    error: null,
    myBookingsStatus: "idle", // idle | loading | succeeded
    BookingsStatus: "idle", // idle | loading | succeeded
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allBookings = action.payload;
        state.BookingsStatus = "succeeded";
      })
      .addCase(fetchmyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.myBookings = action.payload;
        state.myBookingsStatus = "succeeded";
      })
      .addCase(fetchBookings.pending, (state, action) => {
        state.BookingsStatus = "loading";

        state.loading = true;
      })
      .addCase(fetchmyBookings.pending, (state, action) => {
        state.myBookingsStatus = "loading";

        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allBookings.push(action.payload);
        state.myBookings.push(action.payload);
      })

      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allBookings = state.allBookings.filter(
          (b) => b.id !== action.payload,
        );
        state.myBookings = state.myBookings.filter(
          (b) => b.id !== action.payload,
        );
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.BookingsStatus = "succeeded";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchmyBookings.rejected, (state, action) => {
        state.myBookingsStatus = "succeeded";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = bookingSlice.actions;

export default bookingSlice.reducer;
