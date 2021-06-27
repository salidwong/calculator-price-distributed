import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { default as NumberFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLocationByIndex,
  selectSelectedLocationList,
  setIsEditByIndex,
  updateSelectedLocationList,
} from "../../slice/location";
import { selectMaxProduct, selectPricePerUnit } from "../../slice/product";
import { useMemo } from "react";

const useStyles = makeStyles(() => {
  return {
    container: {
      marginTop: "20px",
    },
  };
});

const CustomFieldInput = (props) => {
  return <NumberFormat customInput={TextField} {...props} />;
};

export const Item = ({ selectedLocation, index }) => {
  const { name, maxDist, fee, unit, cost, isEdit } = selectedLocation;
  const dispatch = useDispatch();
  const maxProduct = useSelector(selectMaxProduct);
  const pricePerUnit = useSelector(selectPricePerUnit);
  const selectedLocationList = useSelector(selectSelectedLocationList);
  const classes = useStyles();

  console.log("maxProduct", maxProduct);
  console.log("maxDist", maxDist);
  console.log("unit", unit);
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

  console.log("totalUnit", totalUnit);

  const withValueLimit = ({ floatValue, value }) => {
    if (!value) return true;

    return floatValue <= maxDist && floatValue <= maxProduct - totalUnit;
  };

  return (
    <Grid
      container
      className={classes.container}
      justify="space-between"
      alignItems="center"
    >
      <Grid item xs={3} />
      <Grid item xs={2}>
        <Typography>{name}</Typography>
      </Grid>
      {isEdit && (
        <Grid item xs={2}>
          <CustomFieldInput
            isAllowed={withValueLimit}
            thousandSeparator
            value={unit || ""}
            onValueChange={(values) => {
              const { floatValue } = values;
              dispatch(
                updateSelectedLocationList({
                  value: floatValue,
                  fee,
                  pricePerUnit,
                  index,
                  list: selectedLocationList,
                })
              );
            }}
          />
        </Grid>
      )}

      {!isEdit && (
        <Grid item xs={2}>
          <Typography>{unit}</Typography>
        </Grid>
      )}
      <Grid item xs={2}>
        <Typography>{cost}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Grid container spacing={2}>
          <Grid item>
            {!isEdit && (
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() =>
                  dispatch(
                    setIsEditByIndex({
                      index,
                      list: selectedLocationList,
                      value: true,
                    })
                  )
                }
              >
                EDIT
              </Button>
            )}
            {isEdit && (
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() =>
                  dispatch(
                    setIsEditByIndex({
                      index,
                      list: selectedLocationList,
                      value: false,
                    })
                  )
                }
              >
                OK
              </Button>
            )}
          </Grid>

          <Grid item>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={() => dispatch(deleteLocationByIndex(index))}
            >
              X
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
