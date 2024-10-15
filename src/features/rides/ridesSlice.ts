/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Geocoder from "react-native-geocoding";

interface RidesState {
  selected?: Ride;
  error: string | null;
}

const initialState: RidesState = {
  selected: undefined,
  error: null,
};

// Action to fetch addresses after the ride is selected
export const fetchAddresses = createAsyncThunk("rides/fetchAddresses", async (ride: Ride, { rejectWithValue }) => {
  try {
    let destinationAddress: string | undefined;
    let pickupAddress: string | undefined;

    // Fetch address if pickupLocation doesn't have one
    if (!ride.pickupLocation.address) {
      const pickupResponse = await Geocoder.from(ride.pickupLocation.latitude, ride.pickupLocation.longitude);
      pickupAddress = pickupResponse.results[0]?.formatted_address;
    }

    // Fetch address if destination doesn't have one
    if (!ride.destination.address) {
      const destinationResponse = await Geocoder.from(ride.destination.latitude, ride.destination.longitude);
      destinationAddress = destinationResponse.results[0]?.formatted_address;
    }
    return { destinationAddress, pickupAddress };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Failed to fetch addresses:", error);
    return rejectWithValue("Failed to fetch addresses");
  }
});

export const ridesSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {
    // This action immediately sets the selected ride without fetching addresses
    rideSelected: (state, action: PayloadAction<Ride>) => {
      state.selected = action.payload;
    },
    resetSelectedRide: (state) => {
      state.selected = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        if (state.selected) {
          state.selected.destination.address = action.payload.destinationAddress;
          state.selected.pickupLocation.address = action.payload.pickupAddress;
        }
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch addresses";
      });
  },
});

export const { rideSelected, resetSelectedRide } = ridesSlice.actions;
