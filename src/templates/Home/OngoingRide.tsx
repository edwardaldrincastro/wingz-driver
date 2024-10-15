import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

import { BottomSheet, CustomFlexSpacer, CustomImage, CustomSpacer, RoundedButton } from "../../components";
import { Language } from "../../constants";
import {
  flexChild,
  fs12BoldGray6,
  fs12RegBlack2,
  fs12RegGray11,
  fs16BoldBlack2,
  rowCenterVertical,
  sh24,
  sw16,
  sw4,
  sw56,
  sw8,
} from "../../styles";

const { HOME } = Language.PAGE;

interface OngoingRideProps {
  data: Ride;
  handleEndTrip: () => void;
}

export const OngoingRide: FunctionComponent<OngoingRideProps> = ({ data, handleEndTrip }: OngoingRideProps) => {
  return (
    <BottomSheet>
      <>
        <View style={rowCenterVertical}>
          <CustomImage source={{ uri: data.profilePic }} style={{ width: sw56, height: sw56, borderRadius: sw8 }} />
          <CustomSpacer isHorizontal space={sw16} />
          <View>
            <Text style={fs16BoldBlack2}>{data.username}</Text>
            <Text style={fs12RegBlack2}>{data.paymentMethod}</Text>
          </View>
          <CustomFlexSpacer />
          <View>
            <View style={rowCenterVertical}>
              <CustomSpacer isHorizontal space={sw4} />
              <Text style={fs12BoldGray6}>{data.rate}</Text>
            </View>
            <Text style={fs12RegGray11}>{data.distance}</Text>
          </View>
        </View>
        <CustomSpacer space={sh24} />
        <RoundedButton buttonStyle={{ ...flexChild, width: undefined }} onPress={handleEndTrip} text={HOME.BUTTON_END} />
      </>
    </BottomSheet>
  );
};
