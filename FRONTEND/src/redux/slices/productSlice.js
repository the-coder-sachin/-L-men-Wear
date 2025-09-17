import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async thunk to fetch products by collection and optional filters
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async ({
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    material,
    limit,
    collections, // plural here to match backend
    category, // add category if you want to filter by category
  }) => {
    const query = new URLSearchParams();
    if (gender) query.append("gender", gender);
    if (size) query.append("size", size); // string like "S,M"
    if (color) query.append("color", color);
    if (material) query.append("material", material);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (limit) query.append("limit", limit);
    if (collections) query.append("collections", collections); // plural
    if (category) query.append("category", category);

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    );

    return response.data;
  }
);


// async thunk to fetch a single product's details
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Fetch product failed:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


// async thunk to fetch similar products
export const updateProduct = createAsyncThunk("products/updateProduct", async({id, productData})=>{
    const response =  await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, productData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    });
    return response.data
});

// async thunk to fetch a single product details through product's id
export const fetchSimilarProducts = createAsyncThunk("products/fetchSimilarProducts", async({id})=>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`);
    return response.data
});

const productSlice = createSlice({
    name: "products",
    initialState:{
        products: [],
        selectedProduct: null,
        similarProducts: [],
        loading:false,
        error:null,
        filters:{
            gender:"",
            color:"",
            size:"",
            material:"",
            minPrice:"",
            maxPrice:"",
            search:"",
            sortBy:""
        }
    },
    reducers:{
        setFilters: (state, action)=>{
            state.filters = {...state.filters, ...action.payload}
        },
        clearFilters: (state)=>{
            state.filters = {
              gender: "",
              color: "",
              size: "",
              material: "",
              minPrice: "",
              maxPrice: "",
              search: "",
              sortBy: "",
            };
        }
    },
    extraReducers: (builder)=>{
        builder
          // handle fetching products with filters
          .addCase(fetchProductsByFilters.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
            state.loading = false;
            state.products = Array.isArray(action.payload)
              ? action.payload
              : [];
          })
          .addCase(fetchProductsByFilters.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          // handle fetching particular product details
          .addCase(fetchProductDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedProduct = action.payload;
          })
          .addCase(fetchProductDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          // handle updating product
          .addCase(updateProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            const updatedProduct = action.payload;
            const index = state.products.findIndex(
              (product) => product._id === updatedProduct._id
            );
            if (index !== -1) {
              state.products[index] = updatedProduct;
            }
          })
          .addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          // fetch similar products
          .addCase(fetchSimilarProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.similarProducts = action.payload;
          })
          .addCase(fetchSimilarProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
    }
})

export const {setFilters, clearFilters} = productSlice.actions;
export default productSlice.reducer; 