import dayjs from "dayjs";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import MapView, { Region } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  ActionButtons,
  BottomSheet,
  CustomFlexSpacer,
  CustomImage,
  CustomMap,
  CustomMapMarker,
  CustomSpacer,
  IconButton,
  IconText,
  LabeledTitle,
  LinkText,
  MapDirections,
  RoundedButton,
} from "../components";
import { DAY_DATE_TIME_FORMAT, Language } from "../constants";
import {
  fetchAddresses,
  located,
  resetSelectedRide,
  rideSelected,
  statusUpdated,
  useFetchRidesQuery,
  useUpdateRideStatusMutation,
} from "../features";
import { calculateDeltaFromMidpointMultiple, calculateMidpointMultiple, getTimeBeforePickup } from "../helpers";
import {
  absolutePosition,
  circle,
  colorBlue,
  colorGreen,
  colorWhite,
  flexChild,
  fs12BoldGray6,
  fs12BoldGreen1,
  fs12RegBlack2,
  fs12RegGray11,
  fs16BoldBlack2,
  fs16MedBlack1,
  fs16RegBlack1,
  fsAlignCenter,
  fsCapitalize,
  fullHW,
  fullWidth,
  px,
  py,
  rowCenterVertical,
  sh20,
  sh24,
  sh4,
  sh40,
  sh8,
  shadow12Black112,
  sw16,
  sw32,
  sw4,
  sw44,
  sw56,
  sw8,
} from "../styles";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MOCK_PREVIOUS_LOCATION = { latitude: 14.5629, longitude: 121.0364 };
const MOCK_CURRENT_LOCATION = { latitude: 14.541, longitude: 121.05 };
const DEFAULT_DELTA = { latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA };

const { HOME } = Language.PAGE;

interface HomeProps {}

export const Home: FunctionComponent<HomeProps> = () => {
  // Notes: use Location Service API from Google to get FindPickupPointsForPlace
  const { bottom, top } = useSafeAreaInsets();

  const dispatch = useAppDispatch();

  const { currentLocation, driverId } = useAppSelector((state) => state.driver);
  const selectedRide = useAppSelector((state) => state.rides.selected);
  const status = useAppSelector((state) => state.driver.status);

  const {
    data: rides,
    isFetching,
    refetch,
  } = useFetchRidesQuery(
    {
      longitude: currentLocation?.longitude,
      latitude: currentLocation?.longitude,
    },
    { skip: currentLocation === undefined },
  );

  const [updateRideStatus] = useUpdateRideStatusMutation();

  // region is being set through moveLocation ref
  const [region] = useState<Region>({
    // when the map opens, it will open to the last location of the driver
    ...MOCK_PREVIOUS_LOCATION,
    ...DEFAULT_DELTA,
  });
  const mapRef = useRef<MapView | null>(null);

  const [viewDetails, setViewDetails] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [traveling, setTraveling] = useState<boolean>(false);

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
      setViewDetails(false);
      setAccepted(false);
    }
  };

  const handleAccept = () => {
    setAccepted(true);
    if (selectedRide) {
      updateRideStatus({ id: selectedRide.id, status: "accepted", driverId });
      // TODO calculate time left to know if will go now, later or in few days
    }
  };

  const handleGoNow = () => {
    if (currentLocation && selectedRide) {
      setViewDetails(false);
      setAccepted(false);
      moveToLocation(currentLocation.latitude, currentLocation.longitude, 0.005, 0.005);
      setTraveling(true);
      // dispatch(resetSelectedRide());
    }
  };

  console.log("accepted", accepted);
  console.log("viewDetails", viewDetails);
  console.log("traveling", traveling);

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

  // simulate getting the live location of the driver
  useEffect(() => {
    const getLiveLocation = async () => {
      // const { latitude, longitude } = await getCurrentLocation();
      dispatch(located(MOCK_CURRENT_LOCATION));

      moveToLocation(MOCK_CURRENT_LOCATION.latitude, MOCK_CURRENT_LOCATION.longitude);
    };

    getLiveLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // if rider requests has been received, move the map to the midpoint of driver and riders
    // used to also reset the midpoint when a ride has been declined
    if (currentLocation) {
      if (rides && !selectedRide) {
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
  }, [rides, selectedRide]);

  return (
    <View style={fullHW}>
      {currentLocation && (
        <CustomMap ref={mapRef} region={region}>
          {/* map markers for nearby rides */}
          {rides &&
            !traveling &&
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
          <CustomMapMarker coordinate={currentLocation} type="driverAlt" />

          {/* map directions for driver and rider pick up location */}
          {currentLocation !== undefined && selectedRide && selectedRide.pickupLocation && (
            <MapDirections destination={selectedRide.pickupLocation} origin={currentLocation} />
          )}

          {/* live marker to pick up location */}
          {traveling && currentLocation && selectedRide && <CustomMapMarker coordinate={selectedRide.pickupLocation} type="riderPickup" />}

          {/* map marker and directions for rider pick up location and destination */}
          {viewDetails && selectedRide && selectedRide.destination && selectedRide.pickupLocation && (
            <>
              <CustomMapMarker coordinate={selectedRide.pickupLocation} type="riderPickup" />
              <MapDirections destination={selectedRide.destination} origin={selectedRide.pickupLocation} />
              <CustomMapMarker coordinate={selectedRide.destination} type="riderDestination" />
            </>
          )}
        </CustomMap>
      )}
      <View style={{ ...absolutePosition, ...fullWidth, top: top }}>
        <View style={{ ...px(sw16), ...rowCenterVertical, ...shadow12Black112 }}>
          <IconButton color={colorBlue._0} name="more" size={sh20} style={circle(sh40, colorWhite._1)} />
          <CustomFlexSpacer />
          <IconText
            color={status ? colorGreen._0 : colorBlue._0}
            iconPosition="right"
            iconSize={sh24}
            name={status ? "flash-on" : "flash-off"}
            onPress={() => dispatch(statusUpdated())}
            spaceBetween={0}
            style={{ borderRadius: sw32, backgroundColor: colorWhite._1, ...px(sw16), ...py(sh8) }}
            text={status ? "Online" : "Offline"}
            textStyle={{ ...fs12BoldGray6, width: sw44 }}
          />
        </View>
      </View>
      <View style={{ ...absolutePosition, ...fullWidth, bottom: bottom }}>
        {isFetching && (
          <BottomSheet>
            <Text style={{ ...fs16MedBlack1, ...fsAlignCenter }}>Getting nearby requests...</Text>
          </BottomSheet>
        )}
        {rides && rides.length === 0 && !isFetching && (
          <BottomSheet>
            <View style={rowCenterVertical}>
              <Text style={{ ...fs16MedBlack1, ...fsAlignCenter }}>No nearby requests</Text>
              <CustomFlexSpacer />
              <LinkText onPress={refetch} style={{ ...fs12BoldGray6, color: colorBlue._0 }} text={HOME.BUTTON_TRY} />
            </View>
          </BottomSheet>
        )}
        {selectedRide && !traveling && (
          <BottomSheet>
            <>
              {!accepted ? (
                <>
                  <View style={rowCenterVertical}>
                    <CustomImage source={{ uri: selectedRide.profilePic }} style={{ width: sw56, height: sw56, borderRadius: sw8 }} />
                    <CustomSpacer isHorizontal space={sw16} />
                    <View>
                      <Text style={fs16BoldBlack2}>{selectedRide.username}</Text>
                      <Text style={fs12RegBlack2}>{selectedRide.paymentMethod}</Text>
                    </View>
                    <CustomFlexSpacer />
                    <View>
                      <View style={rowCenterVertical}>
                        <CustomSpacer isHorizontal space={sw4} />
                        <Text style={fs12BoldGray6}>{selectedRide.rate}</Text>
                      </View>
                      <Text style={fs12RegGray11}>{selectedRide.distance}</Text>
                    </View>
                  </View>
                  <CustomSpacer space={sh24} />
                  <LabeledTitle label={HOME.LABEL_WHEN} title={dayjs(selectedRide.pickupTime).format(DAY_DATE_TIME_FORMAT)} />
                  <CustomSpacer space={sh8} />
                  <LabeledTitle label={HOME.LABEL_STATUS} title={selectedRide.status} titleStyle={{ ...fs12BoldGreen1, ...fsCapitalize }} />
                  {viewDetails ? (
                    <View>
                      <CustomSpacer space={sh8} />
                      <LabeledTitle label={HOME.LABEL_PICKUP} spaceToBottom={sh8} title={selectedRide.pickupLocation.address || "-"} />
                      <LabeledTitle label={HOME.LABEL_DESTINATION} spaceToBottom={sh24} title={selectedRide.destination.address || "-"} />
                      <ActionButtons primary={{ onPress: handleAccept }} secondary={{ onPress: handleDecline }} />
                    </View>
                  ) : (
                    <>
                      <CustomSpacer space={sh24} />
                      <RoundedButton buttonStyle={{ ...flexChild, width: undefined }} onPress={handleViewDetails} text="View Details" />
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* accepted and soon */}
                  <View>
                    <LabeledTitle label={HOME.LABEL_WHEN} title={dayjs(selectedRide.pickupTime).format(DAY_DATE_TIME_FORMAT)} />
                    <CustomSpacer space={sh4} />
                    <LabeledTitle label={HOME.LABEL_PICKUP} title={selectedRide.pickupLocation.address || "-"} />
                    <CustomSpacer space={sh24} />
                    <Text style={fs16RegBlack1}>
                      This ride is scheduled in <Text style={fs16BoldBlack2}>{getTimeBeforePickup(selectedRide.pickupTime)}</Text>. You are
                      <Text style={fs16BoldBlack2}> 20 mins</Text> away from pick up location. Ready to go now?
                    </Text>
                    <CustomSpacer space={sh24} />
                    <ActionButtons
                      primary={{ onPress: handleGoNow, text: HOME.BUTTON_YES }}
                      secondary={{ onPress: handleLater, text: HOME.BUTTON_LATER }}
                    />
                  </View>
                  {/* accepted but in the future
                <View>
                  <LabeledTitle
                    label={HOME.LABEL_WHEN}
                    title={dayjs(selectedRide.pickupTime).format(DAY_DATE_TIME_FORMAT)}
                  />
                  <CustomSpacer space={sh4} />
                  <LabeledTitle
                    label={HOME.LABEL_PICKUP}
                    title={selectedRide.pickupLocation.address || "-"}
                  />
                  <CustomSpacer space={sh24} />
                  <Text style={fs16RegBlack1}>
                    This ride is scheduled in <Text style={fs16BoldBlack2}>{getTimeBeforePickup(selectedRide.pickupTime)}</Text>.
                    We'll send you a reminder as the time approaches.
                  </Text>
                  <CustomSpacer space={sh24} />
                  <RoundedButton buttonStyle={{ ...flexChild, width: undefined }} onPress={() => {}} text="Got it" />
                </View> */}
                </>
              )}
            </>
          </BottomSheet>
        )}
      </View>
    </View>
  );
};
