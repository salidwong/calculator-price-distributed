import { createSlice } from "@reduxjs/toolkit";
import format from "date-fns/format";

const today = new Date();
const tomorrow = new Date(today);
const nextWeek = new Date(today);

tomorrow.setDate(tomorrow.getDate() + 1);
nextWeek.setDate(nextWeek.getDate() + 7);

const initialState = {
  selectedDate: format(tomorrow, "yyyy/MM/dd"),
  tomorrow: format(tomorrow, "yyyy/MM/dd"),
  nextWeek: format(nextWeek, "yyyy/MM/dd"),
};

export const datePicker = createSlice({
  name: "date",
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      const { payload } = action;
      state.selectedDate = payload;
    },
  },
});

export const { setSelectedDate } = datePicker.actions;

export const selectDate = (state) => state.date;
export const selectSelectedDate = (state) => state.date.selectedDate;
export const selectTomorrow = (state) => state.date.tomorrow;
export const selectNextWeek = (state) => state.date.nextWeek;

export default datePicker.reducer;
