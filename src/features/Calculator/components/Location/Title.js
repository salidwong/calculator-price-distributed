import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedDate } from "../../slice/datePicker";
import { setIsMapOpen } from "../../slice/location";
import { selectSelectedProductId } from "../../slice/product";

const useStyles = makeStyles(() => {
  return {
    container: {
      marginTop: "20px",
    },
  };
});

export const Title = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);
  const selectedProductId = useSelector(selectSelectedProductId);

  return (
    <Grid
      container
      className={classes.container}
      justify="space-between"
      alignItems="center"
    >
      <Grid item xs={3}>
        <Typography>Locations</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>Place</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>Units</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>Cost</Typography>
      </Grid>
      <Grid item xs={2}>
        <Button
          disabled={selectedProductId === "0" || !selectedDate}
          size="small"
          variant="contained"
          color="primary"
          onClick={() => dispatch(setIsMapOpen(true))}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
};
