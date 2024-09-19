import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../apiUtils";
import { getCookie } from "../utils/cookieUtils";

// Get the authentication token from cookies
const token = getCookie('authToken');

// Thunk for adding an item to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiUrl('api/cart/addTocart'), {
        userId,
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for fetching all cart items
export const getAllCarts = createAsyncThunk(
  "cart/getAllCarts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiUrl('api/cart/all-cart'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.carts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for updating the item quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, newQuantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(apiUrl('api/cart/update-quantity'), {
        userId,
        productId,
        newQuantity,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Assuming the response contains updated cart data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Additional reducer for removing an item from the cart can be added here
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllCarts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getAllCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const { productId, newQuantity } = action.payload; // Update the quantity in the state
        const cartItem = state.cart.find(item => item.productId === productId);
        if (cartItem) {
          cartItem.quantity = newQuantity; // Update quantity in state
        }
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
