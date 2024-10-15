import { NavigationContainer } from "@react-navigation/native";
import React, { Fragment } from "react";
import { KeyboardAvoidingView, Platform, StatusBar } from "react-native";
import BootSplash from "react-native-bootsplash";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { store } from "./src/app/store";
import { RootNavigator } from "./src/navigation";
import { flexChild } from "./src/styles";

export const App = (): React.JSX.Element => {
  return (
    <NavigationContainer onReady={() => BootSplash.hide({ fade: true })}>
      <SafeAreaProvider>
        <Provider store={store}>
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
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};
