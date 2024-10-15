declare type LatLng = import("react-native-maps").LatLng;

declare interface Coordinates extends LatLng {
  latitudeDelta?: number;
  longitudeDelta?: number;
}

declare interface Ride {
  id: string; // Unique identifier for the ride
  userId: string; // ID of the user requesting the ride
  driverId: string | null; // ID of the driver accepting the ride
  // (null if not accepted)
  pickupLocation: {
    latitude: number; // Latitude of the pickup location
    longitude: number; // Longitude of the pickup location
    address?: string; // TODO
  };
  destination: {
    latitude: number; // Latitude of the destination
    longitude: number; // Longitude of the destination
    address?: string; // TODO
  };
  status: "pending" | "accepted" | "declined" | "started" | "picked-up" | "dropped-off"; // Status of the ride request
  pickupTime: Date; // Time when the ride is scheduled for pickup
  droppedOffTime?: Date; // Time when the ride is scheduled for pickup
  timestamp: Date; // Timestamp of when the ride request was made

  username: string; // TODO
  profilePic: string; // TODO
  rate: string; // TODO
  distance: string; // TODO
  duration: number; // TODO
  paymentMethod: string; // TODO
}
