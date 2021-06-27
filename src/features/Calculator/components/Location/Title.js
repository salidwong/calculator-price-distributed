import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setIsMapOpen } from "../../slice/location";

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
