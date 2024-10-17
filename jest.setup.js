jest.mock("react-native-bootsplash", () => {
  return {
    hide: jest.fn().mockResolvedValue(),
    isVisible: jest.fn().mockResolvedValue(false),
    useHideAnimation: jest.fn().mockReturnValue({
      container: {},
      logo: { source: 0 },
      brand: { source: 0 },
    }),
  };
});

jest.mock("react-native-maps", () => {
  return {
    MapView: jest.fn().mockImplementation(({ children }) => children),
  };
});
jest.mock("react-redux", () => {
  return {
    Provider: jest.fn().mockImplementation(({ children }) => children),
  };
});

jest.mock("react-native-maps-directions", () => {
  return {
    MapViewDirectionsDestination: jest.fn().mockImplementation(({ children }) => children),
  };
});

jest.mock("@reduxjs/toolkit/query/react", () => {
  return {
    createApi: jest.fn(),
    fetchBaseQuery: jest.fn(),
  };
});

jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: jest.fn().mockImplementation(({ children }) => children),
    SafeAreaConsumer: jest.fn().mockImplementation(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
  };
});

jest.mock("react-native-vector-icons", () => {
  return {
    createIconSetFromIcoMoon: jest.fn(() => {
      // eslint-disable-next-line react/react-in-jsx-scope
      const Icon = (props) => <svg {...props} />;
      return Icon;
    }),
  };
});

jest.mock("./src/features", () => ({
  apiSlice: {
    useFetchRidesQuery: jest.fn(),
    useFetchAcceptedRidesQuery: jest.fn(),
    useUpdateRideStatusMutation: jest.fn(),
  },
}));
