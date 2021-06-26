import { Container, makeStyles } from "@material-ui/core";
import { DatePicker } from "./components/DatePicker";
import { Product } from "./components/Product";

const useStyles = makeStyles(() => {
  return {
    container: {
      marginTop: "20px",
    },
  };
});

export const Calculator = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Product />
      <DatePicker />
    </Container>
  );
};
