import { useNetInfo } from "@react-native-community/netinfo";

import { isNotEmpty } from "../utils";

export const useHasInternetConnection = () => {
  const { isConnected, isInternetReachable } = useNetInfo();

  return isNotEmpty(isConnected) && isNotEmpty(isInternetReachable) && isConnected! && isInternetReachable!;
};
