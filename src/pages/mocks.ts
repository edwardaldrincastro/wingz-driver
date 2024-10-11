export const SAMPLE_RIDER_REQUESTS: TransformedRiderRequest[] = [
  {
    id: "1",
    userId: "user123",
    driverId: null,
    pickupLocation: {
      latitude: 14.599512,
      longitude: 120.984222,
    },
    destination: {
      latitude: 14.601513,
      longitude: 120.987656,
    },
    status: "pending",
    pickupTime: new Date("2024-10-11T10:30:00"),
    timestamp: new Date("2024-10-11T09:00:00"),
    marker: {
      latlng: {
        latitude: 14.599512,
        longitude: 120.984222,
      },
    },
    details: {
      username: "Jordan",
      profilePic: "https://i.imgur.com/j7hDgpq.png",
      rate: "$20",
      distance: "1.6 mi",
      paymentMethod: "Applepay",
    },
  },
  {
    id: "2",
    userId: "user456",
    driverId: "driver789",
    pickupLocation: {
      latitude: 14.5984,
      longitude: 120.9858,
    },
    destination: {
      latitude: 14.605,
      longitude: 120.9925,
    },
    status: "accepted",
    pickupTime: new Date("2024-10-11T11:00:00"),
    timestamp: new Date("2024-10-11T09:30:00"),
    marker: {
      latlng: {
        latitude: 14.5984,
        longitude: 120.9858,
      },
    },
    details: {
      username: "Hernandez",
      profilePic: "https://i.imgur.com/HITxHyk.png",
      rate: "$20",
      distance: "1.6 mi",
      paymentMethod: "Applepay",
    },
  },
  {
    id: "3",
    userId: "user789",
    driverId: null,
    pickupLocation: {
      latitude: 14.599,
      longitude: 120.9865,
    },
    destination: {
      latitude: 14.6078,
      longitude: 120.9903,
    },
    status: "pending",
    pickupTime: new Date("2024-10-11T12:00:00"),
    timestamp: new Date("2024-10-11T10:00:00"),
    marker: {
      latlng: {
        latitude: 14.599,
        longitude: 120.9865,
      },
    },
    details: {
      username: "Sabrina",
      profilePic: "https://i.imgur.com/kIsfW43.png",
      rate: "$20",
      distance: "1.6 mi",
      paymentMethod: "Applepay",
    },
  },
  {
    id: "4",
    userId: "user101",
    driverId: null,
    pickupLocation: {
      latitude: 14.6,
      longitude: 120.98,
    },
    destination: {
      latitude: 14.6055,
      longitude: 120.988,
    },
    status: "pending",
    pickupTime: new Date("2024-10-11T13:00:00"),
    timestamp: new Date("2024-10-11T11:30:00"),
    marker: {
      latlng: {
        latitude: 14.6,
        longitude: 120.98,
      },
    },
    details: {
      username: "Alex",
      profilePic: "https://i.imgur.com/9RXLpyk.png",
      rate: "$25",
      distance: "1.6 mi",
      paymentMethod: "PayPal",
    },
  },
  {
    id: "5",
    userId: "user102",
    driverId: "driver790",
    pickupLocation: {
      latitude: 14.601,
      longitude: 120.981,
    },
    destination: {
      latitude: 14.608,
      longitude: 120.989,
    },
    status: "accepted",
    pickupTime: new Date("2024-10-11T14:00:00"),
    timestamp: new Date("2024-10-11T12:00:00"),
    marker: {
      latlng: {
        latitude: 14.601,
        longitude: 120.981,
      },
    },
    details: {
      username: "Emma",
      profilePic: "https://i.imgur.com/tkXxyuT.png",
      rate: "$30",
      distance: "1.6 mi",
      paymentMethod: "Credit Card",
    },
  },
  {
    id: "6",
    userId: "user103",
    driverId: null,
    pickupLocation: {
      latitude: 14.602,
      longitude: 120.982,
    },
    destination: {
      latitude: 14.609,
      longitude: 120.99,
    },
    status: "pending",
    pickupTime: new Date("2024-10-11T15:00:00"),
    timestamp: new Date("2024-10-11T13:30:00"),
    marker: {
      latlng: {
        latitude: 14.602,
        longitude: 120.982,
      },
    },
    details: {
      username: "Michael",
      profilePic: "https://i.imgur.com/oZhK14E.png",
      rate: "$22",
      distance: "1.6 mi",
      paymentMethod: "Cash",
    },
  },
];
