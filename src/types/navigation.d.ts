declare type ParamListBase = import("@react-navigation/native").ParamListBase;

declare type NativeStackScreenProps<
  T extends ParamListBase,
  N extends keyof T,
> = import("react-native-screens/lib/typescript/native-stack/types").NativeStackScreenProps<T, N>;

declare type RootStackParamList = {
  Home: undefined;
  Activity: undefined;
};

declare type HomePageProps = NativeStackScreenProps<RootStackParamList, "Home">;
declare type ActivityPageProps = NativeStackScreenProps<RootStackParamList, "Activity">;
