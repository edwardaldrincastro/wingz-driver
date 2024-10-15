import { createStackNavigator } from "@react-navigation/stack";
import React, { FunctionComponent } from "react";

import { ActivityPage, HomePage, OnboardingPage } from "../pages";

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export const PublicRoute: FunctionComponent = () => {
  return (
    <Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={HomePage} />
      <Screen name="Activity" component={ActivityPage} />
      <Screen name="Onboarding" component={OnboardingPage} />
    </Navigator>
  );
};
