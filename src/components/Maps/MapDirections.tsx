import React, { FunctionComponent } from "react";
import MapViewDirections, { MapViewDirectionsDestination } from "react-native-maps-directions";

import { GOOGLE_PLACES_API_KEY } from "../../constants";
import { colorGreen } from "../../styles";

interface MapDirectionsProps {
  destination: MapViewDirectionsDestination;
  origin: MapViewDirectionsDestination;
}

export const MapDirections: FunctionComponent<MapDirectionsProps> = ({ destination, origin }: MapDirectionsProps) => {
  return (
    <MapViewDirections
      apikey={GOOGLE_PLACES_API_KEY}
      destination={destination}
      mode="DRIVING"
      origin={origin}
      strokeColor={colorGreen._0}
      strokeWidth={5}
      timePrecision="none"
    />
  );
};
