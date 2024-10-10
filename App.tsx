import { NavigationContainer } from "@react-navigation/native";
import React, { Fragment } from "react";
import { KeyboardAvoidingView, Platform, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootNavigator } from "./src/navigation";
import { flexChild } from "./src/styles";

export const App = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar barStyle="default" />
        <Fragment>
          {Platform.select({
            android: <RootNavigator />,
            ios: (
              <KeyboardAvoidingView behavior="padding" style={flexChild}>
                <RootNavigator />
              </KeyboardAvoidingView>
            ),
          })}
        </Fragment>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};
