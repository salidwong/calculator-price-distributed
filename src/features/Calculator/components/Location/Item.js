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
  selectTotalUnit,
  setIsEditByIndex,
  setTotalUnit,
  setWarningMessageByIndex,
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
  const totalUnit = useSelector(selectTotalUnit);
  const classes = useStyles();

  const sumUnit = useMemo(() => {
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

  const withValueLimit = ({ floatValue, value }) => {
    if (!value) return true;

    if (floatValue > maxDist) {
      dispatch(
        setWarningMessageByIndex({
          index,
          list: selectedLocationList,
          message: `maximum location is ${maxDist}`,
        })
      );
    }

    return floatValue <= maxDist;
  };

  const handleConfirmClick = () => {
    if (unit <= maxProduct - totalUnit) {
      dispatch(
        setIsEditByIndex({
          index,
          list: selectedLocationList,
          value: false,
        })
      );
      dispatch(setTotalUnit({ result: sumUnit }));
    } else {
      dispatch(
        setWarningMessageByIndex({
          index,
          list: selectedLocationList,
          message: `maximum product is ${maxProduct}`,
        })
      );
    }
  };

  const warningMessage = useMemo(() => {
    return selectedLocationList[index].warningMessage;
  }, [selectedLocationList, index]);

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
            error={warningMessage !== ""}
            helperText={!warningMessage ? "" : warningMessage}
            isAllowed={withValueLimit}
            thousandSeparator
            value={unit || ""}
            onValueChange={(values) => {
              const { floatValue } = values;
              console.log("floatValue", floatValue);
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
        <Typography>{Number(cost).toFixed(2)}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Grid container spacing={2}>
          <Grid item>
            {!isEdit && (
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => {
                  const currentValue = selectedLocationList[index].unit;

                  dispatch(
                    setIsEditByIndex({
                      index,
                      list: selectedLocationList,
                      value: true,
                    })
                  );
                  dispatch(
                    setTotalUnit({
                      result: !currentValue
                        ? totalUnit - 0
                        : totalUnit - currentValue,
                    })
                  );
                }}
              >
                EDIT
              </Button>
            )}
            {isEdit && (
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={handleConfirmClick}
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
              onClick={() => {
                const currentValue = selectedLocationList[index].unit;

                dispatch(deleteLocationByIndex(index));
                dispatch(
                  setTotalUnit({
                    result: !currentValue
                      ? totalUnit - 0
                      : totalUnit - currentValue,
                  })
                );
              }}
            >
              X
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
