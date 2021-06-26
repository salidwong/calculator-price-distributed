import DateFnsUtils from "@date-io/date-fns";
import { Grid, Typography } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNextWeek,
  selectSelectedDate,
  selectTomorrow,
  setSelectedDate,
} from "../slice/datePicker";
import format from "date-fns/format";

export const DatePickerField = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);
  const tomorrow = useSelector(selectTomorrow);
  const nextWeek = useSelector(selectNextWeek);

  const handleDateChange = (selectedDate) => {
    const formatDate = format(selectedDate, "yyyy/MM/dd");

    dispatch(setSelectedDate(formatDate));
  };

  return (
    <Grid container spacing={7} alignItems="center">
      <Grid item>
        <Typography>Date</Typography>
      </Grid>
      <Grid item>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            format="dd/MM/yyyy"
            minDate={tomorrow}
            maxDate={nextWeek}
            value={selectedDate}
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </Grid>
  );
};
