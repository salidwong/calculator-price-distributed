import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProduct } from "../api/product";

const initialState = {
  list: [],
  selectedProductId: "0",
  maxProduct: 0,
  pricePerUnit: 0,
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
    setMaxProduct: (state, action) => {
      const { payload } = action;
      console.log("payload", payload);
      state.maxProduct = payload;
    },
    setPricePerUnit: (state, action) => {
      const { payload } = action;

      state.pricePerUnit = payload;
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

export const { setSelectedProductId, setMaxProduct, setPricePerUnit } =
  product.actions;

export const selectProduct = (state) => state.product;
export const selectProductList = (state) => state.product.list;
export const selectStatus = (state) => state.product.status;
export const selectSelectedProductId = (state) =>
  state.product.selectedProductId;
export const selectMaxProduct = (state) => state.product.maxProduct;
export const selectPricePerUnit = (state) => state.product.pricePerUnit;

export default product.reducer;
