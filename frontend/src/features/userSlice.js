import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await api.get("/users");
  return res.data;
});
export const createUser = createAsyncThunk(
  "users/create",
  async (data, { getState, rejectWithValue }) => {
    try {
      const user = getState().auth.user;

      const res = await api.post("/users", data, {
        headers: { "x-user-id": user.id },
      });

      return res.data;
    } catch (err) {
      if (err.response?.data?.error) {
        return rejectWithValue(err.response.data.error);
      }
      return rejectWithValue("Failed to create users.");
    }
  },
);

export const updateUserRole = createAsyncThunk(
  "users/updateRole",
  async ({ id, role }, { getState, rejectWithValue }) => {
    try {
      const user = getState().auth.user;

      const res = await api.put(
        `/users/${id}/role`,
        { role },
        {
          headers: { "x-user-id": user.id },
        },
      );

      return res.data;
    } catch (err) {
      if (err.response?.data?.error) {
        return rejectWithValue(err.response.data.error);
      }
      return rejectWithValue("Failed to update role");
    }
  },
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const user = getState().auth.user;

      const res = await api.delete(`/users/${id}`, {
        headers: { "x-user-id": user.id },
      });

      return res.data;
    } catch (err) {
      if (err.response?.data?.error) {
        return rejectWithValue(err.response.data.error);
      }
      return rejectWithValue("Failed to delete user");
    }
  },
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateUserRole.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (u) => u.id !== action.payload?.deletedUserId,
        );
      });
  },
});

export default userSlice.reducer;
