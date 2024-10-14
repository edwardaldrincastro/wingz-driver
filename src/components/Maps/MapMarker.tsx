import React, { FunctionComponent } from "react";
import { MapMarkerProps, Marker } from "react-native-maps";

import { LocalAssets } from "../../assets/images/LocalAssets";

interface CustomMapMarkerProps extends MapMarkerProps {
  type: "driver" | "driverAlt" | "rider" | "riderAlt" | "riderPickup" | "riderDestination";
}

export const CustomMapMarker: FunctionComponent<CustomMapMarkerProps> = ({ type, ...mapMarkerProps }: CustomMapMarkerProps) => {
  return <Marker image={LocalAssets.marker[type]} {...mapMarkerProps} />;
};
