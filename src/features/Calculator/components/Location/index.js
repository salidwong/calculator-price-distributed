import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocation, selectSelectedLocationList } from "../../slice/location";
import { Item } from "./Item";
import { Title } from "./Title";

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
