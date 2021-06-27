import { Container, makeStyles, Paper } from "@material-ui/core";
import { DatePickerField } from "./components/DatePicker";
import { Location } from "./components/Location";
import { MapModal } from "./components/MapModal";
import { Product } from "./components/Product";
import { SuccessModal } from "./components/SuccessModal";
import { Total } from "./components/Total";

const useStyles = makeStyles(() => {
  return {
    container: {
      marginTop: "50px",
    },
    paper: {
      padding: "20px",
    },
  };
});

export const Calculator = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Product />
        <DatePickerField />
        <Location />
        <MapModal />
        <Total />
        <SuccessModal />
      </Paper>
    </Container>
  );
};
