import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLocation } from "../api/location";
import { selectMaxProduct } from "./product";

const initialState = {
  availableLocations: [],
  selectedLocationIdList: [],
  selectedLocationList: [],
  isMapOpen: false,
  status: "idle",
};

export const getLocation = createAsyncThunk(
  "location/fetchLocation",
  async () => {
    const response = await fetchLocation();

    return response;
  }
);

export const location = createSlice({
  name: "location",
  initialState,
  reducers: {
    setIsMapOpen: (state, action) => {
      const { payload } = action;
      state.isMapOpen = payload;
    },
    setSelectedLocationIdList: (state, action) => {
      const { payload } = action;

      state.selectedLocationIdList = payload;
    },

    setIsDetailByIndex: (state, action) => {
      const { payload } = action;
      const { index, list } = payload;

      const currentState = list[index];
      const newState = { ...currentState, isDetail: !currentState.isDetail };

      const newList = list.map((l) => ({ ...l, isDetail: false }));
      newList[index] = newState;

      state.availableLocations = newList;
    },
    clearIsDetail: (state, action) => {
      const { payload } = action;
      const newList = payload.map((p) => ({ ...p, isDetail: false }));

      state.availableLocations = newList;
    },
    setSelectedLocationList: (state, action) => {
      const { payload } = action;

      state.selectedLocationList = payload;
    },
    updateSelectedLocationList: (state, action) => {
      const { payload } = action;
      const { value, index, list, fee, pricePerUnit } = payload;

      const updatedItem = list[index];
      const updated = {
        ...updatedItem,
        unit: value,
        cost: !value ? 0 : value * pricePerUnit + fee,
      };
      const updatedList = [...list];
      updatedList[index] = updated;

      state.selectedLocationList = updatedList;
    },
    setIsEditByIndex: (state, action) => {
      const { payload } = action;
      const { index, list, value } = payload;
      console.log("action", action);

      const currentState = list[index];
      const newState = { ...currentState, isEdit: value };

      const newList = [...list];
      newList[index] = newState;

      state.selectedLocationList = newList;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getLocation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLocation.fulfilled, (state, action) => {
        const { payload } = action;
        const list = payload.map((p) => ({ ...p, isDetail: false }));

        state.status = "idle";
        state.availableLocations = list;
      });
  },
});

export const {
  setIsMapOpen,
  setSelectedLocationIdList,
  setIsDetailByIndex,
  clearIsDetail,
  setSelectedLocationList,
  updateSelectedLocationList,
  setIsEditByIndex,
} = location.actions;

export const selectLocation = (state) => state.location;
export const selectIsMapOpen = (state) => state.location.isMapOpen;
export const selectAvailableLocations = (state) =>
  state.location.availableLocations;
export const selectSelectedLocationIdList = (state) =>
  state.location.selectedLocationIdList;
export const selectSelectedLocationList = (state) =>
  state.location.selectedLocationList;

export const addLocationByIndex = (index) => (dispatch, getState) => {
  const availableLocations = selectAvailableLocations(getState());
  const selectedLocationIdList = selectSelectedLocationIdList(getState());
  const selectedLocationList = selectSelectedLocationList(getState());

  const locationByIndex = availableLocations[index];
  const id = locationByIndex.id;
  const mergeIdList = [...selectedLocationIdList, id];
  const findLocation = availableLocations.find((al) => al.id === id);
  const { id: locationId, name, fee, max_dist } = findLocation;
  const location = {
    id: locationId,
    name,
    fee,
    maxDist: max_dist,
    unit: 0,
    cost: 0,
    isEdit: false,
  };
  const mergeLocationList = [...selectedLocationList, { ...location }];

  dispatch(setSelectedLocationIdList(mergeIdList));
  dispatch(setSelectedLocationList(mergeLocationList));
  dispatch(clearIsDetail(availableLocations));
  dispatch(setIsMapOpen(false));
};

export const deleteLocationByIndex = (index) => (dispatch, getState) => {
  const selectedLocationIdList = selectSelectedLocationIdList(getState());
  const selectedLocationList = selectSelectedLocationList(getState());

  const filterLocationIdList = selectedLocationIdList.filter(
    (location, i) => i !== index
  );
  const filterLocationList = selectedLocationList.filter(
    (location, i) => i !== index
  );

  dispatch(setSelectedLocationIdList(filterLocationIdList));
  dispatch(setSelectedLocationList(filterLocationList));
};

export default location.reducer;
