import { CommonActions } from "@react-navigation/native";
import React, { FunctionComponent, RefObject, useEffect, useRef, useState } from "react";
import { PermissionsAndroid, Platform, Text, TextStyle, View } from "react-native";
import PagerView from "react-native-pager-view";

import { LocalAssets } from "../assets/images/LocalAssets";
import { CustomImage, CustomSpacer, RoundedButton, SafeAreaPage } from "../components";
import { Language } from "../constants";
import {
  centerHV,
  centerVertical,
  colorBlue,
  colorGray,
  flexChild,
  flexRow,
  fs16RegGreen3,
  fs16SemiBoldWhite4,
  fs24SemiBoldGreen3,
  fsAlignCenter,
  fullHW,
  fullWidth,
  px,
  sh16,
  sh20,
  sh24,
  sh28,
  sh4,
  sh48,
  sh8,
  spaceBetweenHorizontal,
  sw24,
  sw8,
} from "../styles";

const { AUTH } = Language.PAGE;

export const OnboardingPage: FunctionComponent<OnboardingPageProps> = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageViewRef: RefObject<PagerView> | null = useRef(null);

  const handleLogin = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      }),
    );
  };

  const headingTextStyle: TextStyle = { ...fs24SemiBoldGreen3, ...fsAlignCenter };
  const subHeadingTextStyle: TextStyle = { ...fs16RegGreen3, ...fsAlignCenter, lineHeight: sh24 };

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
        <PagerView
          onPageSelected={(e) => {
            setCurrentPage(e.nativeEvent.position);
          }}
          ref={pageViewRef}
          initialPage={0}
          style={flexChild}>
          <View key={1} style={flexChild}>
            <View style={{ ...flexChild, ...centerHV }}>
              <CustomImage source={LocalAssets.illustration.onboarding1} style={fullHW} />
            </View>
            <View style={{ ...px(sw24), ...centerHV }}>
              <Text style={headingTextStyle}>{AUTH.HEADING_1}</Text>
              <CustomSpacer space={sh8} />
              <Text style={subHeadingTextStyle}>{AUTH.SUBHEADING_1}</Text>
            </View>
          </View>
          <View key={2} style={flexChild}>
            <View style={{ ...flexChild, ...centerHV }}>
              <CustomImage source={LocalAssets.illustration.onboarding2} style={fullHW} />
            </View>
            <View style={{ ...px(sw24), ...centerHV }}>
              <Text style={headingTextStyle}>{AUTH.HEADING_2}</Text>
              <CustomSpacer space={sh8} />
              <Text style={subHeadingTextStyle}>{AUTH.SUBHEADING_2}</Text>
            </View>
          </View>
          <View key={3} style={flexChild}>
            <View style={{ ...flexChild, ...centerHV }}>
              <CustomImage source={LocalAssets.illustration.onboarding3} style={fullHW} />
            </View>
            <View style={{ ...px(sw24), ...centerHV }}>
              <Text style={headingTextStyle}>{AUTH.HEADING_3}</Text>
              <CustomSpacer space={sh8} />
              <Text style={subHeadingTextStyle}>{AUTH.SUBHEADING_3}</Text>
            </View>
          </View>
        </PagerView>
        <CustomSpacer space={sh48} />
        <View style={px(sw24)}>
          <View style={{ ...centerHV, ...flexRow, gap: sw8 }}>
            {Array.from({ length: 3 }, (_, i) => (
              <View
                key={i}
                style={{ height: sh4, width: sw24, backgroundColor: currentPage === i ? colorBlue._0 : colorGray._2, borderRadius: sw8 }}
              />
            ))}
          </View>
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
