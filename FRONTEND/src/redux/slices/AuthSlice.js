import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// retrieve user info from local storage if available
const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// check for guest ID in local storage if unavailable then generate a new one
const initialGuestId = localStorage.getItem("guestId") || `guest_${Date.now()}`;
localStorage.setItem("guestId", initialGuestId); // Only once

//initial state
const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  error: null,
  loading: false,
};

// ✅ Helper to get token with Bearer
const getAuthHeader = () => {
  const token = localStorage.getItem("userToken");
  return { Authorization: `Bearer ${token}` };
};

// async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData
      );

      // Only log in development mode
      if (process.env.NODE_ENV === "development") {
        console.log(response);
      }

      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);

      return response.data.user;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// async thunk for user register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userData
      );

      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);

      return response.data.user;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// async thunk to update user
export const updateUser = createAsyncThunk("auth/updateUser", async ({id, userData}, {rejectWithValue})=>{
  try {
    console.log({id: id, userData: userData});
    
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, userData, {headers:getAuthHeader()});
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error?.response?.data || error.message)
  }
})

// slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`; // reset guest ID on logout
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId); // set new guest ID in local storage
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`; // reset guest ID on logout
      localStorage.setItem("guestId", state.guestId); // set new guest ID in local storage
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null; // Clear error on success
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null; // Clear error on success
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      const updatedUser = action.payload;
      state.user = {
        ...updatedUser,
        id: updatedUser.id || updatedUser._id,
      };
      state.error = null;

      // Update localStorage with new user info
      localStorage.setItem("userInfo", JSON.stringify(state.user));
    });

  },
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;
