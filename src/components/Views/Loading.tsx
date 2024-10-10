import React, { Fragment, FunctionComponent } from "react";
import { ActivityIndicator, Text, View, ViewStyle } from "react-native";
import { CircleSnail } from "react-native-progress";

import { centerHV, colorGreen, fs16MedWhite4, fsAlignCenter, sh4, sw136, sw20, sw48, sw5 } from "../../styles";
import { CustomSpacer } from "./Spacer";

interface LoadingProps {
  color?: string;
  label?: string;
  size?: number;
  style?: ViewStyle;
  thickness?: number;
  type?: "native" | "snail";
}

export const Loading: FunctionComponent<LoadingProps> = ({ color, label, size, style, type, thickness }: LoadingProps) => {
  return (
    <View style={{ ...centerHV, backgroundColor: colorGreen._2, height: sw136, width: sw136, borderRadius: sw20, ...style }}>
      {type === "snail" ? (
        <Fragment>
          <CircleSnail color={color || colorGreen._1} size={size || sw48} thickness={thickness || sw5} />
          {label && (
            <Fragment>
              <CustomSpacer space={sh4} />
              <Text style={{ ...fs16MedWhite4, ...fsAlignCenter }}>{label}</Text>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <ActivityIndicator color={color || colorGreen._1} size={size || "small"} />
      )}
    </View>
  );
};
