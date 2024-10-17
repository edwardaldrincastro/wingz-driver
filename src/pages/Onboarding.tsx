import { CommonActions } from "@react-navigation/native";
import React, { FunctionComponent, useEffect } from "react";
import { PermissionsAndroid, Platform, View } from "react-native";

import { LocalAssets } from "../assets/images/LocalAssets";
import { CustomSpacer, Pager, RoundedButton, SafeAreaPage } from "../components";
import { Language } from "../constants";
import {
  centerVertical,
  flexChild,
  fs16SemiBoldWhite4,
  fullWidth,
  px,
  sh16,
  sh20,
  sh24,
  sh28,
  spaceBetweenHorizontal,
  sw24,
} from "../styles";

const { AUTH } = Language.PAGE;

export const OnboardingPage: FunctionComponent<OnboardingPageProps> = ({ navigation }) => {
  const handleLogin = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      }),
    );
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          title: "Allow Wingz Driver to Access Your Location",
          message: "Enable your location to continue using the app.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // eslint-disable-next-line no-console
          console.log("You can use the location");
        } else {
          // eslint-disable-next-line no-console
          console.log("location permission denied");
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(err);
      }
    };
    if (Platform.OS === "android") {
      requestLocationPermission();
    }
  }, []);

  return (
    <SafeAreaPage bottomSpace={sh24}>
      <View style={{ ...flexChild, ...spaceBetweenHorizontal }}>
        <Pager
          data={[
            { image: LocalAssets.illustration.onboarding1, title: AUTH.HEADING_1, subtitle: AUTH.SUBHEADING_1 },
            { image: LocalAssets.illustration.onboarding2, title: AUTH.HEADING_2, subtitle: AUTH.SUBHEADING_2 },
            { image: LocalAssets.illustration.onboarding3, title: AUTH.HEADING_3, subtitle: AUTH.SUBHEADING_3 },
          ]}
        />
        <View style={px(sw24)}>
          <CustomSpacer space={sh28} />
          <View style={centerVertical}>
            <RoundedButton
              buttonStyle={fullWidth}
              disabled={false}
              onPress={handleLogin}
              text={AUTH.BUTTON_LOGIN}
              textStyle={fs16SemiBoldWhite4}
              withDebounce={true}
            />
            <CustomSpacer space={sh16} />
            <RoundedButton
              buttonStyle={fullWidth}
              disabled={false}
              onPress={handleLogin}
              text={AUTH.BUTTON_SIGN_UP}
              withDebounce={true}
              secondary={true}
            />
            <CustomSpacer space={sh20} />
          </View>
        </View>
      </View>
    </SafeAreaPage>
  );
};
