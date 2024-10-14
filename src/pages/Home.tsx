import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import Geocoder from "react-native-geocoding";
import MapView, { Marker, Region } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LocalAssets } from "../assets/images/LocalAssets";
import {
  CustomFlexSpacer,
  CustomImage,
  CustomMap,
  CustomSpacer,
  IconButton,
  IconText,
  LabeledTitle,
  OutlineButton,
  RoundedButton,
} from "../components";
import { DAY_DATE_TIME_FORMAT, GOOGLE_PLACES_API_KEY } from "../constants";
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
  fs14SemiBoldBlack3,
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
  sh16,
  sh20,
  sh24,
  sh4,
  sh40,
  sh8,
  shadow12Black112,
  sw16,
  sw24,
  sw32,
  sw4,
  sw44,
  sw56,
  sw8,
} from "../styles";
import { isArrayNotEmpty } from "../utils";
import { SAMPLE_RIDER_REQUESTS } from "./mocks";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MOCK_CURRENT_LOCATION = { latitude: 14.541, longitude: 121.05 };

export const Home = () => {
  const mapRef = useRef<MapView | null>(null);
  const [region, setRegion] = useState<Region>({
    ...MOCK_CURRENT_LOCATION,
    // latitude: 14.5534,
    // longitude: 121.05,
    // latitudeDelta: 0.015,
    // longitudeDelta: 0.015,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [currentLocation, setCurrentLocation] = useState<Coordinates>(MOCK_CURRENT_LOCATION);
  const [riderLocations, setRiderLocations] = useState<Location | undefined>(undefined);
  const [selectedRiderRequest, setSelectedRiderRequest] = useState<RiderRequest | undefined>(undefined);
  const [riderRequests, setRiderRequests] = useState<RiderRequest[]>([]);
  const [viewDetails, setViewDetails] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(true);
  const navigation = useNavigation();
  const { bottom, top } = useSafeAreaInsets();

  // const currentLocationLat = useRef(new Animated.Value(37.82)).current;
  // const currentLocationLong = useRef(new Animated.Value(-122.4324)).current;

  const onRegionChange = (currentRegion: Region) => {
    // console.log("onChange currentRegion", currentRegion);
    // setRegion(currentRegion);
  };

  const moveToLocation = async (latitude: number, longitude: number, latitudeDelta = LATITUDE_DELTA, longitudeDelta = LONGITUDE_DELTA) => {
    if (mapRef && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        },
        1000,
      );
    }
  };

  const handleDeclineRider = () => {
    setSelectedRiderRequest(undefined);
    setRiderLocations(undefined);
    setViewDetails(false);
    setAccepted(false);
  };

  const handleLater = () => {
    handleDeclineRider();
    // TODO for later
  };

  const handleRiderPress = async (request: RiderRequest) => {
    setSelectedRiderRequest(request);

    const driverRiderPickupCoords = [request.pickupLocation, currentLocation];
    const midpoint = calculateMidpointMultiple(driverRiderPickupCoords);

    // const dynamicDelta = calculateDeltaFromMidpointMultiple(driverRiderPickupCoords, midpoint, 1.1);

    moveToLocation(midpoint.latitude, midpoint.longitude);

    setRiderLocations({
      destinationCoordinates: request.destination,
      pickUpCoordinates: request.pickupLocation,
    });
  };

  const handleViewDetails = async () => {
    if (riderLocations) {
      setViewDetails(true);

      const getDestinationLocation = await Geocoder.from(
        riderLocations.destinationCoordinates.latitude,
        riderLocations.destinationCoordinates.longitude,
      );
      const getPickUpLocation = await Geocoder.from(riderLocations.pickUpCoordinates.latitude, riderLocations.pickUpCoordinates.longitude);
      const formattedDestination = getDestinationLocation.results[0].formatted_address;
      const formattedPickUp = getPickUpLocation.results[0].formatted_address;

      setRiderLocations((prevState) => ({
        ...prevState!,
        destinationAddress: formattedDestination,
        pickUpAddress: formattedPickUp,
      }));

      const driverRiderCoords = [currentLocation, riderLocations.destinationCoordinates, riderLocations.destinationCoordinates];
      const midpoint = calculateMidpointMultiple(driverRiderCoords);
      const dynamicDelta = calculateDeltaFromMidpointMultiple(driverRiderCoords, midpoint, 2.1);

      moveToLocation(midpoint.latitude - dynamicDelta * 0.5, midpoint.longitude, dynamicDelta, dynamicDelta);
    }
  };

  // const getLiveLocation = async () => {
  //   const { latitude, longitude } = await getCurrentLocation();
  //   setCurrentLocation({
  //     latitude: latitude,
  //     longitude: longitude,
  //     latitudeDelta: LATITUDE_DELTA,
  //     longitudeDelta: LONGITUDE_DELTA,
  //   });
  // };

  // useEffect(() => {
  //   getLiveLocation();
  // }, []);

  useEffect(() => {
    const fetchRiderRequest = async () => {
      // dummy fetch
      const FETCH_TIMER = isArrayNotEmpty(riderRequests) ? 0 : 1000;

      console.log("Fetching...");

      setTimeout(() => {
        // transform response
        const requestsCoordinates = SAMPLE_RIDER_REQUESTS.map((eachReq) => eachReq.pickupLocation);
        requestsCoordinates.push(currentLocation);

        const midpoint = calculateMidpointMultiple(requestsCoordinates);
        const dynamicDelta = calculateDeltaFromMidpointMultiple(requestsCoordinates, midpoint, 1.2);
        moveToLocation(midpoint.latitude, midpoint.longitude, dynamicDelta, dynamicDelta);

        setRiderRequests(SAMPLE_RIDER_REQUESTS);

        console.log("Response received!");
      }, FETCH_TIMER);
    };
    // fetch nearby requests if no requests saved, and if no selected rider
    if (!isArrayNotEmpty(riderRequests) || (isArrayNotEmpty(riderRequests) && selectedRiderRequest === undefined)) {
      fetchRiderRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRiderRequest]);

  return (
    <View style={{ ...fullHW }}>
      {/* <View style={containerStyle}> */}
      <CustomMap
        ref={mapRef}
        onRegionChange={onRegionChange}
        region={region}
        // onRegionChange={onRegionChange}
      >
        {!viewDetails &&
          riderRequests.map((rider, index) => {
            const handleMarkerPress = () => {
              handleRiderPress(rider);
            };

            const isSelected = selectedRiderRequest?.id === rider.id;
            return (
              <Marker
                coordinate={rider.pickupLocation}
                image={isSelected ? LocalAssets.marker.riderAlt : LocalAssets.marker.rider}
                key={index}
                onPress={handleMarkerPress}
              />
            );
          })}
        <Marker coordinate={currentLocation} image={LocalAssets.marker.driverAlt} />
        {currentLocation !== undefined && riderLocations !== undefined && (
          <MapViewDirections
            apikey={GOOGLE_PLACES_API_KEY}
            destination={riderLocations.pickUpCoordinates}
            mode="DRIVING"
            origin={currentLocation}
            strokeColor={colorGreen._0}
            strokeWidth={5}
            timePrecision="none"
          />
        )}
        {viewDetails && riderLocations && (
          <>
            <Marker coordinate={riderLocations.pickUpCoordinates} image={LocalAssets.marker.riderPickup} />
            <MapViewDirections
              apikey={GOOGLE_PLACES_API_KEY}
              destination={riderLocations.destinationCoordinates}
              mode="DRIVING"
              origin={riderLocations.pickUpCoordinates}
              strokeColor={colorGreen._0}
              strokeWidth={5}
              timePrecision="none"
            />
            <Marker coordinate={riderLocations.destinationCoordinates} image={LocalAssets.marker.riderDestination} />
          </>
        )}
      </CustomMap>
      {/* </View> */}
      <View
        style={{
          ...absolutePosition,
          top: top,
          ...fullWidth,
        }}>
        <View
          style={{
            ...px(sw16),
            // marginHorizontal: sw24,
            borderRadius: sw16,
            ...rowCenterVertical,
            ...shadow12Black112,
          }}>
          <IconButton color={colorBlue._0} name="more" size={sh20} style={circle(sh40, colorWhite._1)} />
          <CustomFlexSpacer />
          <IconText
            color={status ? colorGreen._0 : colorBlue._0}
            iconPosition="right"
            iconSize={sh24}
            name={status ? "flash-on" : "flash-off"}
            onPress={() => setStatus(!status)}
            style={{ borderRadius: sw32, backgroundColor: colorWhite._1, ...px(sw16), ...py(sh8) }}
            text={status ? "Online" : "Offline"}
            textStyle={{ ...fs12BoldGray6, width: sw44 }}
          />
        </View>
      </View>
      <View
        style={{
          ...absolutePosition,
          ...fullWidth,
          bottom: bottom,
        }}>
        {!isArrayNotEmpty(riderRequests) && (
          <View
            style={{
              ...px(sw16),
              ...py(sh16),
              ...shadow12Black112,
              backgroundColor: colorWhite._1,
              borderRadius: sw16,
              marginHorizontal: sw24,
            }}>
            <Text style={{ ...fs16MedBlack1, ...fsAlignCenter }}>Getting nearby requests...</Text>
          </View>
        )}
        {selectedRiderRequest && (
          <View
            style={{
              ...px(sw16),
              ...py(sh16),
              ...shadow12Black112,
              backgroundColor: colorWhite._1,
              borderRadius: sw16,
              marginHorizontal: sw24,
            }}>
            {!accepted ? (
              <>
                <View style={rowCenterVertical}>
                  <CustomImage
                    source={{ uri: selectedRiderRequest.details.profilePic }}
                    style={{ width: sw56, height: sw56, borderRadius: sw8 }}
                  />
                  <CustomSpacer isHorizontal space={sw16} />
                  <View>
                    <Text style={fs16BoldBlack2}>{selectedRiderRequest.details.username}</Text>
                    <Text style={fs12RegBlack2}>{selectedRiderRequest.details.paymentMethod}</Text>
                  </View>
                  <CustomFlexSpacer />
                  <View>
                    <View style={rowCenterVertical}>
                      <CustomSpacer isHorizontal space={sw4} />
                      <Text style={fs12BoldGray6}>{selectedRiderRequest.details.rate}</Text>
                    </View>
                    <Text style={fs12RegGray11}>{selectedRiderRequest.details.distance}</Text>
                  </View>
                </View>
                <CustomSpacer space={sh24} />
                <LabeledTitle
                  label="When"
                  labelStyle={fs12RegGray11}
                  title={dayjs(selectedRiderRequest.pickupTime).format(DAY_DATE_TIME_FORMAT)}
                  titleStyle={fs14SemiBoldBlack3}
                />
                <CustomSpacer space={sh8} />
                <LabeledTitle
                  label="Status"
                  labelStyle={fs12RegGray11}
                  title={selectedRiderRequest.status}
                  titleStyle={{ ...fs12BoldGreen1, ...fsCapitalize }}
                />
                {viewDetails ? (
                  <View>
                    <CustomSpacer space={sh8} />
                    <LabeledTitle
                      label="Pick Up Location"
                      labelStyle={fs12RegGray11}
                      title={riderLocations?.pickUpAddress || "-"}
                      titleStyle={fs14SemiBoldBlack3}
                    />
                    <CustomSpacer space={sh8} />
                    <LabeledTitle
                      label="Destination"
                      labelStyle={fs12RegGray11}
                      title={riderLocations?.destinationAddress || "-"}
                      titleStyle={fs14SemiBoldBlack3}
                    />
                    <CustomSpacer space={sh24} />
                    <View style={rowCenterVertical}>
                      <OutlineButton buttonStyle={flexChild} onPress={handleDeclineRider} text="Decline" />
                      <CustomSpacer isHorizontal space={sw16} />
                      <RoundedButton buttonStyle={flexChild} onPress={() => setAccepted(true)} text="Accept" />
                    </View>
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
                  <LabeledTitle
                    label="When"
                    labelStyle={fs12RegGray11}
                    title={dayjs(selectedRiderRequest.pickupTime).format(DAY_DATE_TIME_FORMAT)}
                    titleStyle={fs14SemiBoldBlack3}
                  />
                  <CustomSpacer space={sh4} />
                  <LabeledTitle
                    label="Pick Up Location"
                    labelStyle={fs12RegGray11}
                    title={riderLocations?.pickUpAddress || "-"}
                    titleStyle={fs14SemiBoldBlack3}
                  />
                  <CustomSpacer space={sh24} />
                  <Text style={fs16RegBlack1}>
                    This ride is scheduled in <Text style={fs16BoldBlack2}>{getTimeBeforePickup(selectedRiderRequest.pickupTime)}</Text>.
                    You are
                    <Text style={fs16BoldBlack2}> 20 mins</Text> away from pick up location. Ready to go now?
                  </Text>
                  <CustomSpacer space={sh24} />
                  <View style={rowCenterVertical}>
                    <OutlineButton buttonStyle={flexChild} onPress={handleLater} text="Later" />
                    <CustomSpacer isHorizontal space={sw16} />
                    <RoundedButton buttonStyle={flexChild} onPress={() => {}} text="Yes" />
                  </View>
                </View>
                {/* accepted but in the future
                <View>
                  <LabeledTitle
                    label="When"
                    labelStyle={fs12RegGray11}
                    title={dayjs(selectedRiderRequest.pickupTime).format(DAY_DATE_TIME_FORMAT)}
                    titleStyle={fs14SemiBoldBlack3}
                  />
                  <CustomSpacer space={sh4} />
                  <LabeledTitle
                    label="Pick Up Location"
                    labelStyle={fs12RegGray11}
                    title={riderLocations?.pickUpAddress || "-"}
                    titleStyle={fs14SemiBoldBlack3}
                  />
                  <CustomSpacer space={sh24} />
                  <Text style={fs16RegBlack1}>
                    This ride is scheduled in <Text style={fs16BoldBlack2}>{getTimeBeforePickup(selectedRiderRequest.pickupTime)}</Text>.
                    We'll send you a reminder as the time approaches.
                  </Text>
                  <CustomSpacer space={sh24} />
                  <RoundedButton buttonStyle={{ ...flexChild, width: undefined }} onPress={() => {}} text="Got it" />
                </View> */}
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
};
