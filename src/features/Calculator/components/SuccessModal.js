import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { selectLocationStatus, setLocationStatus } from "../slice/location";

const useStyles = makeStyles(() => {
  return {
    content: {
      padding: "20px",
    },
    button: {
      marginTop: "20px",
    },
  };
});

export const SuccessModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const locationStatus = useSelector(selectLocationStatus);

  return (
    <Dialog
      open={locationStatus === "success"}
      fullWidth
      maxWidth="sm"
      onClose={() => null}
    >
      <DialogTitle>Success Modal</DialogTitle>
      <DialogContent className={classes.content}>
        <Typography align="center">SUCCESS</Typography>
        <Grid container justify="center">
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => dispatch(setLocationStatus("idle"))}
          >
            Close
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
