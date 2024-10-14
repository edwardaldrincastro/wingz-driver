declare type LatLng = import("react-native-maps").LatLng;

declare interface TypeMarker {
  latlng: LatLng;
  description?: string;
  title?: string;
}

declare interface Coordinates extends LatLng {
  latitudeDelta?: number;
  longitudeDelta?: number;
}

declare interface Delta {
  latitudeDelta: number;
  longitudeDelta: number;
}

declare interface Location {
  destinationCoordinates: Coordinates;
  destinationAddress?: string;
  pickUpCoordinates: Coordinates;
  pickUpAddress?: string;
}

declare interface RideDetails {
  username: string;
  profilePic: string;
  rate: string;
  distance: string;
  duration: number;
  paymentMethod: string;
}

declare interface RiderRequest {
  id: string; // Unique identifier for the ride
  userId: string; // ID of the user requesting the ride
  details: RideDetails;
  driverId: string | null; // ID of the driver accepting the ride
  // (null if not accepted)
  pickupLocation: {
    latitude: number; // Latitude of the pickup location
    longitude: number; // Longitude of the pickup location
  };
  destination: {
    latitude: number; // Latitude of the destination
    longitude: number; // Longitude of the destination
  };
  status: "pending" | "accepted" | "declined" | "started" | "picked-up" | "dropped-off"; // Status of the ride request
  pickupTime: Date; // Time when the ride is scheduled for pickup
  timestamp: Date; // Timestamp of when the ride request was made
}
