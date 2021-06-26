import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import productReducer from "../features/Calculator/slice/product";
import datePickerReducer from "../features/Calculator/slice/datePicker";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    date: datePickerReducer,
  },
});
