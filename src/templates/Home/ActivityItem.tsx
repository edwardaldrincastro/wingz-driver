import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomFlexSpacer, CustomSpacer } from "../../components";
import { IcoMoon } from "../../icons";
import {
  centerVertical,
  colorBlue,
  colorWhite,
  flexChild,
  flexRow,
  flexWrap,
  fs10RegBlack2,
  fs12MedBlack3,
  fs12RegBlack2,
  fs14MedBlack3,
  fullWidth,
  px,
  py,
  rowCenterVertical,
  sh12,
  sh16,
  spaceBetweenHorizontal,
  sw1,
  sw16,
  sw8,
} from "../../styles";

interface Activity {
  destination: string;
  pickupTime: string;
  origin: string;
  droppedOffTime: string;
  rate: string;
  distance: string;
}

interface ActivityItemProps {
  data: Activity;
}

export const ActivityItem: FunctionComponent<ActivityItemProps> = ({ data }: ActivityItemProps) => {
  return (
    <View style={{ backgroundColor: colorWhite._1, ...fullWidth, ...px(sw16), ...py(sh16), borderRadius: sw8 }}>
      <View style={{ ...rowCenterVertical, ...spaceBetweenHorizontal }}>
        <Text style={fs14MedBlack3}>{data.rate}</Text>
        <Text style={fs12RegBlack2}>{data.distance}</Text>
      </View>
      <CustomSpacer space={sh12} />
      <View style={flexRow}>
        <View style={centerVertical}>
          <IcoMoon color={colorBlue._0} name="origin" size={sh16} />
          <View style={{ width: sw1, backgroundColor: colorBlue._0, ...flexChild }} />
          <IcoMoon color={colorBlue._0} name="origin" size={sh16} />
        </View>
        <CustomSpacer isHorizontal space={sw8} />
        <View>
          <Text style={{ ...fs12MedBlack3, ...flexWrap }}>{data.origin}</Text>
          <Text style={{ ...fs10RegBlack2, ...flexWrap }}>{data.pickupTime}</Text>
          <CustomSpacer space={sh12} />
          <Text style={{ ...fs12MedBlack3, ...flexWrap }}>{data.destination}</Text>
          <Text style={{ ...fs10RegBlack2, ...flexWrap }}>{data.droppedOffTime || "-"}</Text>
        </View>
        <CustomFlexSpacer />
      </View>
    </View>
  );
};
