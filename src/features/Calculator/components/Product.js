import {
  Typography,
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  selectProductList,
  selectSelectedProductId,
  setSelectedProductId,
} from "../slice/product";

const useStyles = makeStyles(() => {
  return {
    product: {
      width: "200px",
    },
  };
});

export const Product = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const products = useSelector(selectProductList);
  const selectedProductId = useSelector(selectSelectedProductId);

  useEffect(() => {
    dispatch(getProduct());
  }, []);

  const handleProductChange = (e) => {
    const { target } = e;
    const { value } = target;

    dispatch(setSelectedProductId(value));
  };

  return (
    <>
      <Grid container spacing={4} alignItems="center">
        <Grid item>
          <Typography>Product</Typography>
        </Grid>
        <Grid item md={6}>
          <FormControl className={classes.product}>
            <Select value={selectedProductId} onChange={handleProductChange}>
              <MenuItem value="0" disabled>
                Please select Product
              </MenuItem>
              {products.map((product) => {
                return (
                  <MenuItem key={product.name} value={product.id}>
                    {product.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};
