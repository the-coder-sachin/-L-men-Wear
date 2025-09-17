import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ✅ Helper to get token with Bearer
const getAuthHeader = () => {
  const token = localStorage.getItem("userToken");
  return { Authorization: `Bearer ${token}` };
};

// ✅ fetch all orders (admin)
export const fetchAllOrders = createAsyncThunk(
  "adminOrder/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/admin/orders`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// ✅ update order delivery status (admin)
export const updateOrderStatus = createAsyncThunk(
  "adminOrder/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
        console.log({id: id});
        
      const response = await axios.put(
        `${BACKEND_URL}/api/admin/orders/${id}`,
        { status },
        {
          headers: getAuthHeader(),
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// ✅ delete an order (admin)
export const deleteOrder = createAsyncThunk(
  "adminOrder/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/admin/orders/${id}`, {
        headers: getAuthHeader(),
      });
      return id;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// ✅ initial state
const initialState = {
  orders: [],
  totalOrders: 0,
  totalSales: 0,
  loading: false,
  error: null,
};

// ✅ admin order slice
const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;

        const totalSales = action.payload.reduce(
          (acc, order) => acc + (order.totalPrice || 0),
          0
        );
        state.totalSales = totalSales;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
      })

      // update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        const index = state.orders.findIndex((o) => o._id === updatedOrder._id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
        state.error = null;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update order";
      })

      // delete order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete order";
      });
  },
});

export default adminOrderSlice.reducer;
