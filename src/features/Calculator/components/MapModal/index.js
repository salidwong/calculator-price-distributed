import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLocationByIndex,
  clearIsDetail,
  selectAvailableLocations,
  selectIsMapOpen,
  selectSelectedLocationIdList,
  setIsDetailByIndex,
  setIsMapOpen,
} from "../../slice/location";

const markerProp = {
  width: "10px",
  height: "10px",
  borderRadius: 10,
  border: 3,
  borderColor: "secondary.main",
};

const markerSelectedProp = {
  bgcolor: "secondary.main",
  width: "13px",
  height: "13px",
  borderRadius: 10,
};

const defaultDetailProp = {
  width: "180px",
  height: "120px",
  bgcolor: "white",
  border: 1,
  borderColor: "primary.main",
  borderRadius: "borderRadius",
  mt: 2,
  p: 2,
};

const Marker = ({
  info,
  isDetail,
  index,
  availableLocations,
  selectedLocationIdList,
  dispatch,
}) => {
  const { id, name, fee, max_dist } = info;
  const disabled = selectedLocationIdList.some(
    (selectedId) => selectedId === id
  );

  return (
    <>
      {isDetail && (
        <Box
          {...markerSelectedProp}
          onClick={() =>
            dispatch(setIsDetailByIndex({ index, list: availableLocations }))
          }
        />
      )}
      {!isDetail && (
        <Box
          {...markerProp}
          onClick={() =>
            dispatch(setIsDetailByIndex({ index, list: availableLocations }))
          }
        />
      )}

      {isDetail && (
        <Box {...defaultDetailProp}>
          <Typography>{name}</Typography>
          <Typography>Max Units: {max_dist}</Typography>
          <Typography>Fee: {fee}</Typography>
          <Button
            disabled={disabled}
            variant="outlined"
            color="primary"
            onClick={() => dispatch(addLocationByIndex(index))}
          >
            Add
          </Button>
        </Box>
      )}
    </>
  );
};

export const MapModal = () => {
  const dispatch = useDispatch();
  const availableLocations = useSelector(selectAvailableLocations);
  const selectedLocationIdList = useSelector(selectSelectedLocationIdList);
  const isMapOpen = useSelector(selectIsMapOpen);

  const handleOnModalClose = () => {
    dispatch(setIsMapOpen(false));
    dispatch(clearIsDetail(availableLocations));
  };

  return (
    // Important! Always set the container height explicitly
    <Dialog
      open={isMapOpen}
      fullWidth
      maxWidth="md"
      onClose={handleOnModalClose}
    >
      <DialogTitle>Location </DialogTitle>

      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
          defaultCenter={{
            lat: 13.7563,
            lng: 100.5018,
          }}
          defaultZoom={11}
        >
          {availableLocations.map((info, index) => (
            <Marker
              info={info}
              lat={info.lat}
              lng={info.long}
              isDetail={info.isDetail}
              availableLocations={availableLocations}
              selectedLocationIdList={selectedLocationIdList}
              dispatch={dispatch}
              index={index}
            />
          ))}
        </GoogleMapReact>
      </div>
    </Dialog>
  );
};
