import dayjs from "dayjs";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

import { ActionButtons, BottomSheet, CustomFlexSpacer, CustomImage, CustomSpacer, LabeledTitle, RoundedButton } from "../../components";
import { DAY_DATE_TIME_FORMAT, Language } from "../../constants";
import {
  flexChild,
  fs12BoldGray6,
  fs12RegBlack2,
  fs12RegGray11,
  fs14SemiBoldGreen3,
  fs16BoldBlack2,
  fsCapitalize,
  rowCenterVertical,
  sh24,
  sh8,
  sw16,
  sw4,
  sw56,
  sw8,
} from "../../styles";

const { HOME } = Language.PAGE;

interface RideDetailsProps {
  data: Ride;
  handleAccept: () => void;
  handleDecline: () => void;
  handleViewDetails: () => void;
  viewDetails: boolean;
}

export const RideDetails: FunctionComponent<RideDetailsProps> = ({
  data,
  handleAccept,
  handleDecline,
  handleViewDetails,
  viewDetails,
}: RideDetailsProps) => {
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
        <LabeledTitle label={HOME.LABEL_WHEN} title={dayjs(data.pickupTime).format(DAY_DATE_TIME_FORMAT)} />
        <CustomSpacer space={sh8} />
        <LabeledTitle label={HOME.LABEL_STATUS} title={data.status} titleStyle={{ ...fs14SemiBoldGreen3, ...fsCapitalize }} />
        {viewDetails ? (
          <View>
            <CustomSpacer space={sh8} />
            <LabeledTitle label={HOME.LABEL_PICKUP} spaceToBottom={sh8} title={data.pickupLocation.address || "-"} />
            <LabeledTitle label={HOME.LABEL_DESTINATION} spaceToBottom={sh24} title={data.destination.address || "-"} />
            <ActionButtons primary={{ onPress: handleAccept }} secondary={{ onPress: handleDecline }} />
          </View>
        ) : (
          <>
            <CustomSpacer space={sh24} />
            <RoundedButton buttonStyle={{ ...flexChild, width: undefined }} onPress={handleViewDetails} text="View Details" />
          </>
        )}
      </>
    </BottomSheet>
  );
};
