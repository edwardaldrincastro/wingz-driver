import React, { FunctionComponent } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import {
  border,
  centerHV,
  circle,
  colorGray,
  colorGreen,
  colorRed,
  flexRow,
  fs14RegGray9,
  fs8RegWhite1,
  sh18,
  sw1,
  sw10,
  sw12,
  sw20,
  sw296,
  sw8,
} from "../../styles";
import { CustomSpacer } from "./Spacer";

interface InfoCardProps {
  customText?: JSX.Element;
  iconColor?: string;
  iconName?: string;
  number?: string;
  style?: ViewStyle;
  text?: string;
}

export const InfoCard: FunctionComponent<InfoCardProps> = ({ customText, iconColor, iconName, number, style, text }) => {
  const cardStyle: ViewStyle = {
    ...border(colorGray._12, sw1, sw10),
    ...flexRow,
    backgroundColor: colorGreen._9,
    padding: sw12,
    ...style,
  };

  const cardTextSTyle: TextStyle = {
    ...fs14RegGray9,
    width: sw296,
  };

  return (
    <View style={cardStyle}>
      {iconName && <IcoMoon color={iconColor || colorRed._1} name={iconName} size={sw20} />}
      {number && (
        <View style={{ ...circle(sh18, colorGreen._1), ...centerHV }}>
          <Text style={fs8RegWhite1}>{number}</Text>
        </View>
      )}

      <CustomSpacer space={sw8} isHorizontal={true} />

      {customText && customText}
      {text && <Text style={cardTextSTyle}>{text}</Text>}
    </View>
  );
};
