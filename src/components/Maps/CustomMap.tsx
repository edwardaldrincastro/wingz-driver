import React, { forwardRef, ReactNode } from "react";
import MapView, { MapViewProps, PROVIDER_GOOGLE } from "react-native-maps";

import { customMapStyle } from "../../constants";
import { absoluteFillObject } from "../../styles";

interface CustomMapProps extends MapViewProps {
  children: ReactNode;
}

export const CustomMap = forwardRef<MapView, CustomMapProps>(({ children, ...mapViewProps }, ref) => {
  return (
    <MapView.Animated
      customMapStyle={customMapStyle}
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={absoluteFillObject}
      ref={ref}
      {...mapViewProps}>
      {children}
    </MapView.Animated>
  );
});
