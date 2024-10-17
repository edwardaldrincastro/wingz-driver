const config = {
  verbose: true,
  cacheDirectory: ".jest/cache",
  collectCoverage: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
  },
  preset: "react-native",
  setupFiles: ["./jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-native-progress|react-native-vector-icons|react-native-animatable|react-native-device-info|react-native-view-pager)/)",
  ],
};

module.exports = config;
