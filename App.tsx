import { NavigationContainer } from "@react-navigation/native";
import React, { Fragment, useEffect } from "react";
import { KeyboardAvoidingView, PermissionsAndroid, Platform, StatusBar } from "react-native";
import BootSplash from "react-native-bootsplash";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { store } from "./src/app/store";
import { RootNavigator } from "./src/navigation";
import { flexChild } from "./src/styles";

export const App = (): React.JSX.Element => {
  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: "Cool Photo App Camera Permission",
          message: "Cool Photo App needs access to your camera " + "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the camera");
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };
    if (Platform.OS === "android") {
      requestCameraPermission();
    }
  }, []);

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
