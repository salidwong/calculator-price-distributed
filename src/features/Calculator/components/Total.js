import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedDate } from "../slice/datePicker";
import { selectSelectedLocationList, submitLocation } from "../slice/location";
import { selectSelectedProductId } from "../slice/product";

const useStyles = makeStyles(() => {
  return {
    container: {
      marginTop: "40px",
    },
    submit: {
      marginTop: "20px",
    },
  };
});

export const Total = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedLocationList = useSelector(selectSelectedLocationList);
  const selectedDate = useSelector(selectSelectedDate);
  const selectedProductId = useSelector(selectSelectedProductId);

  const totalUnit = useMemo(() => {
    let result = 0;

    selectedLocationList.forEach((location) => {
      const { unit } = location;
      if (!unit) {
        result += 0;
      } else {
        result += location.unit;
      }
    });

    return result;
  }, [selectedLocationList]);

  const totalCost = useMemo(() => {
    let result = 0;

    selectedLocationList.forEach((location) => {
      const { cost } = location;
      if (!cost) {
        result += 0;
      } else {
        result += location.cost;
      }
    });

    return result;
  }, [selectedLocationList]);

  const cart = useMemo(() => {
    return {
      date: selectedDate,
      product: selectedProductId,
      locations: selectedLocationList.map((selected) => ({
        id: selected.id,
        quantity: selected.unit,
      })),
    };
  }, [selectedDate, selectedProductId, selectedLocationList]);

  return (
    <>
      <Grid container spacing={4} className={classes.container}>
        <Grid item>
          <Typography>Total Units</Typography>
        </Grid>
        <Grid item>
          <Typography>{totalUnit}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={5}>
        <Grid item>
          <Typography>Total Cost</Typography>
        </Grid>
        <Grid item>
          <Typography>{totalCost}</Typography>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="secondary"
        className={classes.submit}
        onClick={() => {
          dispatch(submitLocation(cart));
        }}
      >
        SUBMIT
      </Button>
    </>
  );
};
