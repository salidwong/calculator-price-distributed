import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedDate } from "../../slice/datePicker";
import {
  getLocation,
  selectAvailableLocations,
  selectSelectedLocationIdList,
  selectSelectedLocationList,
} from "../../slice/location";
import {
  selectProductList,
  selectSelectedProductId,
} from "../../slice/product";
import { Item } from "./Item";
import { Title } from "./Title";
import differenceInDays from "date-fns/differenceInDays";

export const Location = () => {
  const dispatch = useDispatch();
  const selectedLocationList = useSelector(selectSelectedLocationList);

  useEffect(() => {
    dispatch(getLocation());
  }, []);

  return (
    <>
      <Title />
      {selectedLocationList.map((selected, index) => {
        return <Item selectedLocation={selected} index={index} />;
      })}
    </>
  );
};
