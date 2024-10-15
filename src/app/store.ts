import { configureStore } from "@reduxjs/toolkit";

import { driverSlice, ridesSlice } from "../features";
import { apiSlice } from "../features/rides/ridesApiSlice";

export const store = configureStore({
  reducer: {
    driver: driverSlice.reducer,
    rides: ridesSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  }, // RTK will combine reducers automatically if you pass an object
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
