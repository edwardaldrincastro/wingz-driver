import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Text, View, ViewStyle } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LocalAssets } from "../assets/images/LocalAssets";
import { CustomFlexSpacer, CustomImage, CustomSpacer, OutlineButton, RoundedButton } from "../components";
import { customMapStyle, GOOGLE_PLACES_API_KEY } from "../constants";
import { getCurrentLocation } from "../helpers";
import {
  absoluteFillObject,
  absolutePosition,
  colorBlue,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldGray6,
  fs12RegBlack2,
  fs16BoldBlack2,
  fs16MedBlack1,
  fullHW,
  fullWidth,
  px,
  py,
  rowCenterVertical,
  sh16,
  sh24,
  shadow12Black112,
  sw16,
  sw24,
  sw4,
  sw56,
  sw8,
} from "../styles";
import { isArrayNotEmpty } from "../utils";
import { SAMPLE_RIDER_REQUESTS } from "./mocks";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const Home = () => {
  const mapRef = useRef<MapView | null>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 14.59999702,
    longitude: 120.982609,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });

  const [coord, setCoord] = useState<Coordinates>({ latitude: 14.58952, longitude: 120.984222 });
  const [destination, setDestination] = useState<Coordinates | undefined>(undefined);
  const [selectedRiderRequest, setSelectedRiderRequest] = useState<TransformedRiderRequest | undefined>(undefined);
  const [riderRequests, setRiderRequests] = useState<TransformedRiderRequest[]>([]);
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();

  // const currentLocationLat = useRef(new Animated.Value(37.82)).current;
  // const currentLocationLong = useRef(new Animated.Value(-122.4324)).current;

  const mapStyle: ViewStyle = {
    ...absoluteFillObject,
  };

  const onRegionChange = (currentRegion: Region) => {
    setRegion(currentRegion);
  };

  const handleRiderPress = (request: TransformedRiderRequest) => {
    console.log("request", request.userId);
    setSelectedRiderRequest(request);
    setDestination(request.marker.latlng);
  };

  const getLiveLocation = async () => {
    const { latitude, longitude } = await getCurrentLocation();
    setCoord({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  const moveToLocation = async (latitude, longitude) => {
    if (mapRef && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        2000,
      );
    }
  };

  const onPressAddress = (details) => {
    setDestination({
      latitude: details?.geometry?.location.lat,
      longitude: details?.geometry?.location.lng,
    });
    moveToLocation(details?.geometry?.location.lat, details?.geometry?.location.lng);
  };

  // useEffect(() => {
  //   getLiveLocation();
  // }, []);

  useEffect(() => {
    const fetchRiderRequest = async () => {
      console.log("Fetching...");
      setTimeout(() => {
        console.log("Response received!");
        setRiderRequests(SAMPLE_RIDER_REQUESTS);
      }, 1000);
    };
    if (!isArrayNotEmpty(riderRequests)) {
      fetchRiderRequest();
    }
  }, [riderRequests]);

  return (
    <View style={{ ...fullHW }}>
      {/* <View style={containerStyle}> */}
      <MapView
        customMapStyle={customMapStyle}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        ref={mapRef}
        region={region}
        style={mapStyle}
        // onRegionChange={onRegionChange}
      >
        {riderRequests.map((rider, index) => {
          const handleMarkerPress = () => {
            handleRiderPress(rider);
          };
          return <Marker key={index} coordinate={rider.marker.latlng} onPress={handleMarkerPress} image={LocalAssets.marker.rider} />;
        })}
        <Marker coordinate={coord} image={LocalAssets.marker.driver} />
        {coord !== undefined && destination !== undefined ? (
          <MapViewDirections
            origin={coord}
            destination={destination}
            apikey={GOOGLE_PLACES_API_KEY}
            strokeColor={colorBlue._0}
            strokeWidth={5}
          />
        ) : null}
      </MapView>
      {/* </View> */}
      <View
        style={{
          ...absolutePosition,
          bottom: bottom,
          ...fullWidth,
        }}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            onPressAddress(details);
          }}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "en",
          }}
        />
      </View>
      <View
        style={{
          ...absolutePosition,
          bottom: bottom,
          ...fullWidth,
        }}>
        <View
          style={{
            backgroundColor: colorWhite._1,
            ...py(sh24),
            ...px(sw16),
            marginHorizontal: sw24,
            borderRadius: sw16,
            ...shadow12Black112,
          }}>
          {!isArrayNotEmpty(riderRequests) && <Text style={fs16MedBlack1}>Getting nearby requests...</Text>}
          {selectedRiderRequest && (
            <View>
              <View style={rowCenterVertical}>
                <CustomImage
                  source={{ uri: selectedRiderRequest.details.profilePic }}
                  style={{ width: sw56, height: sw56, borderRadius: sw8 }}
                />
                <CustomSpacer isHorizontal space={sw16} />
                <View>
                  <Text style={{ ...fs16BoldBlack2 }}>{selectedRiderRequest.details.username}</Text>
                  <Text style={{ ...fs12RegBlack2 }}>{selectedRiderRequest.details.paymentMethod}</Text>
                </View>
                <CustomFlexSpacer />
                <View>
                  <View style={rowCenterVertical}>
                    <CustomSpacer isHorizontal space={sw4} />
                    <Text style={{ ...fs12BoldGray6 }}>{selectedRiderRequest.details.rate}</Text>
                  </View>
                  <Text style={{ ...fs12RegBlack2 }}>{selectedRiderRequest.details.distance}</Text>
                </View>
              </View>
              <CustomSpacer space={sh16} />
              <View style={flexRow}>
                <OutlineButton onPress={() => {}} text="Decline" />
                <CustomSpacer isHorizontal space={sw16} />
                <RoundedButton onPress={() => navigation.navigate("Details")} text="Accept" buttonStyle={flexChild} />
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
