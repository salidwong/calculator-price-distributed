import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import productReducer from "../features/Calculator/slice/product";
import datePickerReducer from "../features/Calculator/slice/datePicker";
import locationReducer from "../features/Calculator/slice/location";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    date: datePickerReducer,
    location: locationReducer,
  },
});
