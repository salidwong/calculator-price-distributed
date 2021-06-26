import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProduct } from "../api/product";

const initialState = {
  list: [],
  selectedProductId: "0",
  status: "idle",
};

export const getProduct = createAsyncThunk("product/fetchProduct", async () => {
  const response = await fetchProduct();

  return response;
});

export const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProductId: (state, action) => {
      const { payload } = action;
      state.selectedProductId = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload;
      });
  },
});

export const { setSelectedProductId } = product.actions;

export const selectProduct = (state) => state.product;
export const selectProductList = (state) => state.product.list;
export const selectStatus = (state) => state.product.status;
export const selectSelectedProductId = (state) =>
  state.product.selectedProductId;

export default product.reducer;
