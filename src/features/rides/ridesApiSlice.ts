import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface FetchRidesParams {
  longitude?: number;
  latitude?: number;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000", // change the baseUrl to your IP if you want to use it in your physical device. e.g http://192.168.68.107:3001
  }),
  tagTypes: ["Rides", "Accepted Rides"],
  endpoints: (builder) => ({
    fetchRides: builder.query<Ride[], FetchRidesParams>({
      query({ longitude, latitude }) {
        return `/rides?longitude=${longitude}&latitude=${latitude}&status=pending`;
      },
      providesTags: ["Rides"],
    }),
    fetchAcceptedRides: builder.query<Ride[], void>({
      query() {
        return "/rides?status=accepted";
      },
      providesTags: ["Accepted Rides"],
    }),
    updateRideStatus: builder.mutation<void, { id: string; status: Ride["status"]; driverId?: string }>({
      query: ({ id, status, driverId }) => ({
        url: `rides/${id}`,
        method: "PATCH",
        body: { status, driverId },
      }),
      invalidatesTags: ["Rides"],
    }),
  }),
});

export const { useFetchRidesQuery, useFetchAcceptedRidesQuery, useUpdateRideStatusMutation } = apiSlice;
