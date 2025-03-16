import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: true,
  error: false,
  data: JSON.parse(window.localStorage.getItem("cart")) || [],
  cartItems: JSON.parse(window.localStorage.getItem("saved")) || [],
  total: 0,
};
export const fetchContent = createAsyncThunk("user/userContent", async () => {
  const response = await axios.get(`https://fakestoreapi.com/products`);
  return response.data;
});
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    cartTotal: (state) => {
      let itemTotal = state.cartItems.map((item) => item.price * item.count);
      let totalAmount = itemTotal.reduce((acc, curr) => {
        return acc + curr;
      }, 0);
      state.total = Math.trunc(totalAmount);
    },
    addToCart: (state, action) => {
      let ItemToAdd = state.data.find((item) => item.id === action.payload);
      state.cartItems.push(ItemToAdd);
    },
    removeFromCart: (state, action) => {
      let ItemToRemove = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.cartItems = ItemToRemove;
    },
    increment: (state, action) => {
      let selectedItem = state?.cartItems?.find(
        (item) => item.id === action.payload
      );

      if (selectedItem) {
        selectedItem.count = selectedItem.count + 1;
      }
    },
    decrement: (state, action) => {
      let selectedItem = state?.cartItems?.find(
        (item) => item.id === action.payload
      );

      if (selectedItem) {
        selectedItem.count = selectedItem.count - 1;
      }
    },
    lowPrice: (state) => {
      state.data = state?.data?.sort((a, b) => a.price - b.price);
    },
    highPrice: (state) => {
      state.data = state?.data?.sort((a, b) => b.price - a.price);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.data =
        state.data ||
        action.payload.map((item) => ({
          ...item,
          count: 1,
        }));
    });
    builder.addCase(fetchContent.rejected, (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    });
  },
});
export const {
  increment,
  decrement,
  addToCart,
  removeFromCart,
  cartTotal,
  highPrice,
  lowPrice,
} = userSlice.actions;
export default userSlice.reducer;
