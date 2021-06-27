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
import {
  selectProductList,
  selectSelectedProductId,
  setMaxProduct,
} from "../slice/product";
import differenceInDays from "date-fns/differenceInDays";

export const DatePickerField = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);
  const tomorrow = useSelector(selectTomorrow);
  const nextWeek = useSelector(selectNextWeek);
  const products = useSelector(selectProductList);
  const selectedProductId = useSelector(selectSelectedProductId);

  const handleDateChange = (selectedDate) => {
    const formatDate = format(selectedDate, "yyyy/MM/dd");

    const findProduct = products.find((p) => p.id === selectedProductId);
    const { max_production } = findProduct;
    const tomorrow = max_production["1"];
    const dayAfterTomorrow = max_production["2"];
    const nextTwoDay = max_production["3"];
    const diffDate = differenceInDays(new Date(selectedDate), new Date());

    let maxProductWithSelectedDate = 0;
    switch (diffDate) {
      case 0:
        maxProductWithSelectedDate = tomorrow;
        break;
      case 1:
        maxProductWithSelectedDate = dayAfterTomorrow;
        break;
      case 2:
        maxProductWithSelectedDate = nextTwoDay;
        break;

      default:
        maxProductWithSelectedDate = nextTwoDay;
        break;
    }

    dispatch(setSelectedDate(formatDate));
    dispatch(setMaxProduct(maxProductWithSelectedDate));
  };

  return (
    <Grid container spacing={6} alignItems="center">
      <Grid item>
        <Typography>Date</Typography>
      </Grid>
      <Grid item md={6}>
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
