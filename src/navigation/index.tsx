import { createStackNavigator } from "@react-navigation/stack";
import React, { FunctionComponent } from "react";

import { PublicRoute } from "./Public";

const { Navigator, Screen } = createStackNavigator();

export const RootNavigator: FunctionComponent = () => {
  const defaultOptions = { animationEnabled: false };

  return (
    <Navigator initialRouteName="Public" screenOptions={{ headerShown: false }}>
      <Screen name="Public" component={PublicRoute} options={defaultOptions} />
    </Navigator>
  );
};
