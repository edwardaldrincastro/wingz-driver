interface FAQItem {
  image: import("react-native-fast-image").Source | import("react-native").ImageRequireSource;
  onPress: () => void;
  title: string;
}
