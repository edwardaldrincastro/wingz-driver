declare type LatLng = import("react-native-maps").LatLng;

declare interface Coordinates extends LatLng {
  latitudeDelta?: number;
  longitudeDelta?: number;
}

declare interface Ride {
  driverId: string | null; // ID of the driver accepting the ride (null if not accepted)
  destination: {
    latitude: number; // Latitude of the destination
    longitude: number; // Longitude of the destination
    address?: string; // TODO
  };
  distance: string; // TODO
  droppedOffTime?: Date; // Time when the ride is scheduled for pickup
  duration: number; // TODO
  id: string; // Unique identifier for the ride
  paymentMethod: string; // TODO
  pickupLocation: {
    latitude: number; // Latitude of the pickup location
    longitude: number; // Longitude of the pickup location
    address?: string; // TODO
  };
  pickupTime: Date; // Time when the ride is scheduled for pickup
  profilePic: string; // TODO
  rate: string; // TODO
  status: "pending" | "accepted" | "declined" | "started" | "picked-up" | "dropped-off"; // Status of the ride request
  timestamp: Date; // Timestamp of when the ride request was made
  userId: string; // ID of the user requesting the ride
  username: string; // TODO
}
