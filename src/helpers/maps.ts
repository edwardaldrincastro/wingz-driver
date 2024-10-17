// function to calculate the midpoint of multiple locations
export const calculateMidpointMultiple = (locations: Coordinates[]): Coordinates => {
  const total = locations.reduce(
    (acc, loc) => {
      acc.latitude += loc.latitude;
      acc.longitude += loc.longitude;
      return acc;
    },
    { latitude: 0, longitude: 0 },
  );

  return {
    latitude: total.latitude / locations.length,
    longitude: total.longitude / locations.length,
  };
};

// function to calculate the delta from the midpoint for multiple locations
export const calculateDeltaFromMidpointMultiple = (locations: Coordinates[], midpoint: Coordinates, bufferFactor = 1): number => {
  const { maxLatDiff, maxLonDiff } = locations.reduce(
    (acc, loc) => {
      const latDiff = Math.abs(midpoint.latitude - loc.latitude);
      const lonDiff = Math.abs(midpoint.longitude - loc.longitude);

      return {
        maxLatDiff: Math.max(acc.maxLatDiff, latDiff),
        maxLonDiff: Math.max(acc.maxLonDiff, lonDiff),
      };
    },
    { maxLatDiff: 0, maxLonDiff: 0 },
  );

  return Math.max(maxLatDiff, maxLonDiff) * bufferFactor;
};
