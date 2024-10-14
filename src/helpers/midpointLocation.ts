// Convert degrees to radians
import dayjs from "dayjs";

export const degreesToRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

// Convert radians to degrees
export const radiansToDegrees = (radians: number): number => {
  return radians * (180 / Math.PI);
};

export const calculateMidpoint = (coord1: Coordinates, coord2: Coordinates): Coordinates => {
  // Convert latitude and longitude from degrees to radians
  const lat1 = degreesToRadians(coord1.latitude);
  const lon1 = degreesToRadians(coord1.longitude);
  const lat2 = degreesToRadians(coord2.latitude);
  const lon2 = degreesToRadians(coord2.longitude);

  // Convert lat/lon to Cartesian coordinates (x, y, z)
  const x1 = Math.cos(lat1) * Math.cos(lon1);
  const y1 = Math.cos(lat1) * Math.sin(lon1);
  const z1 = Math.sin(lat1);

  const x2 = Math.cos(lat2) * Math.cos(lon2);
  const y2 = Math.cos(lat2) * Math.sin(lon2);
  const z2 = Math.sin(lat2);

  // Compute the average of the Cartesian coordinates
  const xMid = (x1 + x2) / 2;
  const yMid = (y1 + y2) / 2;
  const zMid = (z1 + z2) / 2;

  // Convert back to latitude/longitude
  const lonMid = Math.atan2(yMid, xMid);
  const hyp = Math.sqrt(xMid * xMid + yMid * yMid);
  const latMid = Math.atan2(zMid, hyp);

  // Return midpoint in degrees
  return {
    latitude: radiansToDegrees(latMid),
    longitude: radiansToDegrees(lonMid),
  };
};

// Function to calculate the midpoint of multiple locations
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

// Function to calculate the delta from the midpoint for multiple locations
export const calculateDeltaFromMidpointMultiple = (
  locations: Coordinates[],
  midpoint: Coordinates,
  bufferFactor = 1, // Default buffer factor to slightly increase delta
): number => {
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

  // Return the largest difference (latitude or longitude) multiplied by the buffer
  return Math.max(maxLatDiff, maxLonDiff) * bufferFactor;
};

// Function to move north of the midpoint by the delta
// export const moveLatitude = (coordinate: Coordinates, deltaDegrees: number): Coordinates => {
//   const newLatitude = coordinate.latitude + deltaDegrees;

//   return {
//     latitude: Math.max(-90, Math.min(90, newLatitude)), // Ensures valid latitude bounds
//     longitude: coordinate.longitude,
//   };
// };

// Function to move north of the midpoint by the delta
export const moveLatitude = (coordinate: Coordinates, deltaDegrees: number): Coordinates => {
  const newLatitude = coordinate.latitude + deltaDegrees;

  // Ensure the latitude stays within valid bounds (-90 to 90 degrees)
  const boundedLatitude = Math.max(-90, Math.min(90, newLatitude));

  return {
    latitude: boundedLatitude,
    longitude: coordinate.longitude, // Keep the longitude the same
  };
};

// Function to move the midpoint's longitude by a delta with a buffer
export const moveMidpointLongitudeWithBuffer = (
  midpoint: Coordinates,
  delta: number,
  bufferFactor = 1, // Default buffer factor to increase delta by 10%
): Coordinates => {
  const bufferedDelta = delta * bufferFactor; // Apply buffer to delta
  const newLongitude = midpoint.longitude + bufferedDelta;

  // Ensure the longitude stays within the valid bounds (-180 to 180 degrees)
  const boundedLongitude = ((newLongitude + 180) % 360) - 180;

  return {
    latitude: midpoint.latitude,
    longitude: boundedLongitude,
  };
};

// Function to move the midpoint latitude up to compensate for the bottom sheet
export const moveMidpointLatitudeForBottomSheet = (
  midpoint: Coordinates,
  bottomSheetHeight: number, // Height of the bottom sheet in pixels
  screenHeight: number, // Total screen height in pixels
  latitudeDeltas: number,
): Coordinates => {
  // Calculate the ratio of the bottom sheet height to the screen height
  const screenRatio = bottomSheetHeight / screenHeight;

  // Calculate latitude delta to move the map's midpoint upward
  // The latitude range is roughly -90 to 90 degrees, so we use this to calculate the delta
  const latitudeDelta = screenRatio * latitudeDeltas; // Adjust 0.5 based on testing for your map setup

  // Update the latitude by moving it upward (north) by the calculated delta
  const newLatitude = midpoint.latitude + latitudeDelta;

  return {
    latitude: newLatitude,
    longitude: midpoint.longitude,
  };
};

export const formatTravelTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hourLabel = hours === 1 ? "hr" : "hrs";
  const minuteLabel = remainingMinutes === 1 ? "min" : "mins";

  return hours > 0 ? `${hours} ${hourLabel} ${remainingMinutes} ${minuteLabel}` : `${minutes} ${minuteLabel}`;
};

export const getTimeBeforePickup = (date: Date): string => {
  const today = dayjs(); // Current date and time
  const targetDate = dayjs(date); // Convert Date object to dayjs

  const diffInDays = targetDate.diff(today, "day"); // Difference in days
  const diffInHours = targetDate.diff(today, "hour") % 24; // Remaining hours
  const diffInMinutes = targetDate.diff(today, "minute") % 60; // Remaining minutes

  // Format the output string based on the new requirements with pluralization
  let result = "";
  if (diffInDays > 0) {
    result += `${diffInDays} day${diffInDays > 1 ? "s" : ""}`;
  } else if (diffInHours > 0) {
    result += `${diffInHours} hour${diffInHours > 1 ? "s" : ""}`;
  } else {
    result += `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""}`;
  }

  return result.trim(); // Trim any extra spaces
};
