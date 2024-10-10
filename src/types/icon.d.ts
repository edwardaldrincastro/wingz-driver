declare interface BaseIcoMoon {
  color?: string;
  name: string;
  onPress?: () => void;
  size?: number;
}

declare interface IconButtonProps {
  color?: string;
  disabled?: boolean;
  name: string;
  onPress?: () => void;
  size?: number;
  style?: import("react-native").ViewStyle;
  testId?: string;
  withDebounce?: boolean;
  withHover?: { color: import("react-native").ColorValue };
}

declare interface IconItemProps extends IconButtonProps {
  title: string;
}
