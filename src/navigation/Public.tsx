import { createStackNavigator } from "@react-navigation/stack";
import React, { FunctionComponent } from "react";

import { Details, Home } from "../pages";

const { Navigator, Screen } = createStackNavigator();

export const PublicRoute: FunctionComponent = () => {
  return (
    <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Details" component={Details} />
    </Navigator>
  );
};
