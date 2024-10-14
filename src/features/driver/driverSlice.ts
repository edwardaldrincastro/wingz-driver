/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DriverState {
  currentLocation?: Coordinates;
  driverId: string;
  status: boolean;
}

const initialState: DriverState = {
  currentLocation: undefined,
  driverId: "dr001",
  status: true,
};

export const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    located(state, action: PayloadAction<Coordinates>) {
      // in RTK, you can mutate the state directly because of immer
      state.currentLocation = action.payload;
    },
    statusUpdated(state) {
      state.status = !state.status;
    },
  },
});

export const { located, statusUpdated } = driverSlice.actions;
