import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import MapView, { Region } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { CustomMap, CustomMapMarker, IconButton, IconText, MapDirections } from "../components";
import {
  fetchAddresses,
  located,
  resetSelectedRide,
  rideSelected,
  statusUpdated,
  useFetchRidesQuery,
  useUpdateRideStatusMutation,
} from "../features";
import { calculateDeltaFromMidpointMultiple, calculateMidpointMultiple } from "../helpers";
import {
  absolutePosition,
  circle,
  colorBlue,
  colorGreen,
  colorWhite,
  fs12BoldGray6,
  fullHW,
  fullWidth,
  px,
  sh24,
  sh44,
  sh48,
  sw16,
  sw44,
  sw48,
} from "../styles";
import { AcceptedRide, ErrorHandling, OngoingRide, RideDetails } from "../templates";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const DEFAULT_DELTA = { latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA };
const MOCK_PREVIOUS_LOCATION = { latitude: 14.5629, longitude: 121.0364 };
const MOCK_CURRENT_LOCATION = { latitude: 14.541, longitude: 121.05 };

export const HomePage: FunctionComponent<HomePageProps> = ({ navigation }: HomePageProps) => {
  const { bottom, top } = useSafeAreaInsets();
  const bottomSpace = bottom > 0 ? bottom : 16;
  const topSpace = top > 0 ? top : 16;

  const dispatch = useAppDispatch();

  const { currentLocation, driverId } = useAppSelector((state) => state.driver);
  const selectedRide = useAppSelector((state) => state.rides.selected);
  const status = useAppSelector((state) => state.driver.status);

  const {
    data: rides,
    error,
    isFetching,
    refetch,
  } = useFetchRidesQuery(
    {
      longitude: currentLocation?.longitude,
      latitude: currentLocation?.longitude,
    },
    { skip: currentLocation === undefined },
  );

  const [updateRideStatus, { isLoading: updateRideIsLoading, originalArgs }] = useUpdateRideStatusMutation();

  const [region] = useState<Region>({ ...MOCK_PREVIOUS_LOCATION, ...DEFAULT_DELTA }); // region is being set through moveLocation ref
  const mapRef = useRef<MapView | null>(null);

  const [onMapReady, setOnMapReady] = useState<boolean>(false);
  const [viewDetails, setViewDetails] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [isTraveling, setIsTraveling] = useState<boolean>(false);

  const moveToLocation = async (latitude: number, longitude: number, latitudeDelta = LATITUDE_DELTA, longitudeDelta = LONGITUDE_DELTA) => {
    if (mapRef && mapRef.current) {
      mapRef.current.animateToRegion({ latitude, longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta }, 600);
    }
  };

  const handleDecline = () => {
    if (selectedRide) {
      updateRideStatus({ id: selectedRide.id, status: "declined" });
      refetch();
      dispatch(resetSelectedRide());
      setViewDetails(false);
    }
  };

  const handleLater = () => {
    if (selectedRide) {
      dispatch(resetSelectedRide());
      refetch();
      setViewDetails(false);
      setAccepted(false);
    }
  };

  const handleAccept = () => {
    setAccepted(true);
    if (selectedRide) {
      updateRideStatus({ id: selectedRide.id, status: "accepted", driverId });
    }
  };

  const handleEndTrip = () => {
    if (selectedRide) {
      setIsTraveling(false);
      dispatch(resetSelectedRide());
      updateRideStatus({ id: selectedRide.id, status: "dropped-off" });
    }
  };

  const handleGoNow = () => {
    if (currentLocation && selectedRide) {
      updateRideStatus({ id: selectedRide.id, status: "started" });
      setViewDetails(false);
      setAccepted(false);
      moveToLocation(currentLocation.latitude, currentLocation.longitude, 0.005, 0.005);
      setIsTraveling(true);
    }
  };

  const handleSelectRide = async (ride: Ride) => {
    if (currentLocation) {
      dispatch(rideSelected(ride));
      dispatch(fetchAddresses(ride));
    }
  };

  const handleViewDetails = async () => {
    if (selectedRide && selectedRide.pickupLocation && selectedRide.destination && currentLocation) {
      setViewDetails(true);

      const driverRiderCoords = [
        currentLocation,
        { longitude: selectedRide.destination.longitude, latitude: selectedRide.destination.latitude },
        { longitude: selectedRide.pickupLocation.longitude, latitude: selectedRide.pickupLocation.latitude },
      ];

      const midpoint = calculateMidpointMultiple(driverRiderCoords);
      const dynamicDelta = calculateDeltaFromMidpointMultiple(driverRiderCoords, midpoint, 2.2);

      moveToLocation(midpoint.latitude - dynamicDelta * 0.4, midpoint.longitude, dynamicDelta, dynamicDelta);
    }
  };

  const handleViewOrders = () => {
    navigation.navigate("Activity");
  };

  const handleOnMapReady = () => {
    setOnMapReady(true);
  };

  // simulate getting the live location of the driver
  useEffect(() => {
    const getLiveLocation = async () => {
      // const { latitude, longitude } = await getCurrentLocation();
      dispatch(located(MOCK_CURRENT_LOCATION));
    };

    getLiveLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // if rider requests has been received, move the map to the midpoint of driver and riders
    // used to also reset the midpoint when a ride has been declined
    if (onMapReady && currentLocation) {
      if (rides && !selectedRide && (!updateRideIsLoading || (updateRideIsLoading && originalArgs?.status === "dropped-off"))) {
        const requestsCoordinates = rides.map((eachReq) => eachReq.pickupLocation);
        // include the currentLocation of the driver to be used for calculating the midpoint
        requestsCoordinates.push(currentLocation);

        const midpoint = calculateMidpointMultiple(requestsCoordinates);
        const dynamicDelta = calculateDeltaFromMidpointMultiple(requestsCoordinates, midpoint, 1.5);

        moveToLocation(
          midpoint.latitude,
          midpoint.longitude,
          rides.length > 0 ? dynamicDelta : DEFAULT_DELTA.latitudeDelta,
          rides.length > 0 ? dynamicDelta : DEFAULT_DELTA.longitudeDelta,
        );
      } else if (selectedRide) {
        const driverRiderPickupCoords = [
          currentLocation,
          { longitude: selectedRide.pickupLocation.longitude, latitude: selectedRide.pickupLocation.latitude },
        ];

        const midpoint = calculateMidpointMultiple(driverRiderPickupCoords);

        moveToLocation(midpoint.latitude, midpoint.longitude);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rides, selectedRide, onMapReady]);

  return (
    <View style={fullHW}>
      <CustomMap onMapReady={handleOnMapReady} ref={mapRef} region={region}>
        {/* map markers for nearby rides */}
        {rides &&
          !isTraveling &&
          !viewDetails &&
          rides.map((rider, index) => {
            const handleMarkerPress = () => {
              handleSelectRide(rider);
            };

            const isSelected = selectedRide?.id === rider.id;

            return (
              <CustomMapMarker
                coordinate={rider.pickupLocation}
                key={index}
                onPress={handleMarkerPress}
                type={isSelected ? "riderAlt" : "rider"}
              />
            );
          })}
        {/* map marker for driver */}
        {currentLocation && <CustomMapMarker coordinate={currentLocation} type="driverAlt" />}

        {/* map directions for driver and rider pick up location */}
        {currentLocation !== undefined && selectedRide && selectedRide.pickupLocation && (
          <MapDirections destination={selectedRide.pickupLocation} origin={currentLocation} />
        )}

        {/* live marker to pick up location */}
        {isTraveling && currentLocation && selectedRide && <CustomMapMarker coordinate={selectedRide.pickupLocation} type="riderPickup" />}

        {/* map marker and directions for rider pick up location and destination */}
        {viewDetails && selectedRide && selectedRide.destination && selectedRide.pickupLocation && (
          <>
            <CustomMapMarker coordinate={selectedRide.pickupLocation} type="riderPickup" />
            <MapDirections destination={selectedRide.destination} origin={selectedRide.pickupLocation} />
            <CustomMapMarker coordinate={selectedRide.destination} type="riderDestination" />
          </>
        )}
      </CustomMap>
      <IconButton
        color={colorBlue._0}
        name="more"
        onPress={handleViewOrders}
        size={sh24}
        style={{ ...absolutePosition, ...circle(sh48, colorWhite._1), left: sw16, top: topSpace }}
      />
      <IconText
        color={status ? colorGreen._0 : colorBlue._0}
        iconPosition="right"
        iconSize={sh24}
        name={status ? "flash-on" : "flash-off"}
        onPress={() => dispatch(statusUpdated())}
        spaceBetween={0}
        style={{
          ...absolutePosition,
          ...px(sw16),
          borderRadius: sw48,
          backgroundColor: colorWhite._1,
          height: sh44,
          right: sw16,
          top: topSpace,
        }}
        text={status ? "Online" : "Offline"}
        textStyle={{ ...fs12BoldGray6, width: sw44 }}
      />
      <View style={{ ...absolutePosition, ...fullWidth, bottom: bottomSpace }}>
        {selectedRide && isTraveling && <OngoingRide data={selectedRide} handleEndTrip={handleEndTrip} />}
        {selectedRide && accepted && <AcceptedRide data={selectedRide} handleLater={handleLater} handleNow={handleGoNow} />}
        {selectedRide && !isTraveling && !accepted && (
          <RideDetails
            data={selectedRide}
            handleAccept={handleAccept}
            handleDecline={handleDecline}
            handleViewDetails={handleViewDetails}
            viewDetails={viewDetails}
          />
        )}
        <ErrorHandling
          error={error}
          isFetching={isFetching && !accepted}
          noNearby={rides !== undefined && rides.length === 0 && !isFetching && !accepted && !isTraveling}
          refetch={refetch}
        />
      </View>
    </View>
  );
};
