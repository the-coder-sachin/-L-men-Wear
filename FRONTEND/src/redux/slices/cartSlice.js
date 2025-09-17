import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// helper function to load the cart from local storage
const loadCartFromStorage = ()=>{
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {products:[]};
};

// helper function to save cart to local storage
const saveCartToStorage = (cart)=>{
    localStorage.setItem("cart", JSON.stringify(cart));
};

// fetch cart for user/guest
export const fetchCart = createAsyncThunk("cart/fetchCart", async({userId, guestId}, {rejectWithValue})=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {params:{userId, guestId}});
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data)
    }
});

// add item to the cart for user/guest
export const addToCart = createAsyncThunk("cart/addToCart", async({productId, quantity, size, color, guestId, userId}, {rejectWithValue})=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/`, {productId, quantity, size, color, userId, guestId});
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data); 
    }
})

// update the quantity of the product in the cart
export const updateCartItemQuantity = createAsyncThunk("cart/updateCartItemQuantity", async({productId, quantity, guestId, userId, size, color}, {rejectWithValue})=>{
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{productId, quantity, guestId, userId, size, color});
        return response.data;
    } catch (error) {
         console.error(error);
         return rejectWithValue(error.response.data);
    }
});

// remove item from cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({productId, guestId, userId, size, color}, {rejectWithValue})=>{
    try {
        const response = await axios({
            method: "DELETE",
            url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            data: {productId, guestId, userId, size, color}
        });
        return response.data;        
    } catch (error) {
         console.error(error);
         return rejectWithValue(error.response.data);
    }
});

// merge guest cart with user cart
export const mergeCart = createAsyncThunk("cart/mergeCart", async({guestId, userId}, {rejectWithValue})=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,{guestId, userId}, {headers:{ Authorization: `Bearer ${localStorage.getItem("userToken")}`}})
        return response.data;
    } catch (error) {
         console.error(error);
         return rejectWithValue(error.response.data);
    }
})

// clear cart from backend
export const clearCartFromBackend = createAsyncThunk(
  "cart/clearCartFromBackend",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/clear`,
        {
          data: { userId, guestId },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        clearCart : (state)=>{
            state.cart = {products: []};
            localStorage.removeItem("cart")
        }
    },
    extraReducers:(builder)=>{
        builder
          .addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
          })
          .addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "failed to fetch cart";
          })
          .addCase(addToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
          })
          .addCase(addToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "failed to add to cart";
          })
          .addCase(updateCartItemQuantity.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
          })
          .addCase(updateCartItemQuantity.rejected, (state, action) => {
            state.loading = false;
            state.error =
              action.payload?.message || "failed to update item quantity";
          })
          .addCase(removeFromCart.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(removeFromCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
          })
          .addCase(removeFromCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "failed to remove item";
          })
          .addCase(mergeCart.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(mergeCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
          })
          .addCase(mergeCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "failed to merge cart";
          })
          .addCase(clearCartFromBackend.fulfilled, (state) => {
            state.cart = { products: [] };
            localStorage.removeItem("cart");
          })
          .addCase(clearCartFromBackend.rejected, (state, action) => {
            state.error =
              action.payload?.message || "failed to clear cart from backend";
          });

    }
})

export const {clearCart} = cartSlice.actions;
export default cartSlice.reducer;