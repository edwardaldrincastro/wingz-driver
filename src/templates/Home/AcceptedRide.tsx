import dayjs from "dayjs";
import React, { FunctionComponent } from "react";
import { Text } from "react-native";

import { ActionButtons, BottomSheet, CustomSpacer, LabeledTitle } from "../../components";
import { DAY_DATE_TIME_FORMAT, Language } from "../../constants";
import { fs16BoldBlack2, fs16RegBlack1, sh24, sh4 } from "../../styles";

const { HOME } = Language.PAGE;

interface AcceptedRideProps {
  data: Ride;
  handleLater: () => void;
  handleNow: () => void;
}

type RideCategory = "now" | "soon" | "future";

export const AcceptedRide: FunctionComponent<AcceptedRideProps> = ({ data, handleLater, handleNow }: AcceptedRideProps) => {
  const now = dayjs("2024-10-16T00:00:00"); // i'm using a mock date and time to match the requests pickup time in the db
  const targetDate = dayjs(data.pickupTime);

  const diffInMinutes = targetDate.diff(now, "minute");
  const diffInDays = targetDate.diff(now, "day");
  const diffInHours = targetDate.diff(now, "hour") % 24;
  const remainingMinutes = diffInMinutes % 60;

  let category: RideCategory = "future";

  if (diffInMinutes <= 120) {
    category = "now";
  } else if (diffInMinutes > 120 && diffInMinutes < 720) {
    category = "soon";
  }

  let timeLeft = "";
  if (diffInDays > 0) {
    timeLeft += `${diffInDays} day${diffInDays > 1 ? "s" : ""}`;
  } else if (diffInHours > 0) {
    timeLeft += `${diffInHours} hour${diffInHours > 1 ? "s" : ""}`;
  } else {
    timeLeft += `${remainingMinutes} min${remainingMinutes > 1 ? "s" : ""}`;
  }

  const readyToGo = category === "soon" ? HOME.LABEL_READY : "";

  let primaryButtonText = "Yes";

  if (category === "now") {
    primaryButtonText = HOME.BUTTON_START;
  } else if (category === "future") {
    primaryButtonText = HOME.BUTTON_GOT_IT;
  }

  const distanceAway = "20 mins"; // this is the duration to travel to the destination, we can use GooglePlaces API to get this

  return (
    <BottomSheet>
      <>
        <LabeledTitle label={HOME.LABEL_WHEN} title={dayjs(data.pickupTime).format(DAY_DATE_TIME_FORMAT)} />
        <CustomSpacer space={sh4} />
        <LabeledTitle label={HOME.LABEL_PICKUP} title={data.pickupLocation.address || "-"} />
        <CustomSpacer space={sh24} />
        {category === "future" ? (
          <Text style={fs16RegBlack1}>
            {HOME.LABEL_ACCEPT_SCHEDULED} <Text style={fs16BoldBlack2}>{timeLeft}</Text>. {HOME.LABEL_ACCEPT_REMINDER}
          </Text>
        ) : (
          <Text style={fs16RegBlack1}>
            {HOME.LABEL_ACCEPT_SCHEDULED} <Text style={fs16BoldBlack2}>{timeLeft}</Text>. {HOME.LABEL_ACCEPT_YOU}
            <Text style={fs16BoldBlack2}> {distanceAway}</Text> {HOME.LABEL_ACCEPT_AWAY} {readyToGo}
          </Text>
        )}
        <CustomSpacer space={sh24} />
        <ActionButtons
          primary={{ onPress: category === "future" ? handleLater : handleNow, text: primaryButtonText }}
          secondary={category === "soon" ? { onPress: handleLater, text: "Later" } : undefined}
        />
      </>
    </BottomSheet>
  );
};
