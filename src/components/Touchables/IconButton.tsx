import React, { FunctionComponent } from "react";
import { Pressable, Text, View } from "react-native";

import { IcoMoon } from "../../icons";
import { centerHV, circle, colorGreen, fs12RegGreen3, sh48, sh72, sh8, sw24, sw80 } from "../../styles";
import { CustomSpacer } from "../Views";

export const IconItem: FunctionComponent<IconItemProps> = ({ title, color, disabled, name, onPress, size, style, testId }) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={{ ...centerHV, height: sh72, width: sw80, ...style }}
      testID={testId || "component-IconItem"}>
      <View
        style={{
          ...circle(sh48, colorGreen._9),
          ...centerHV,
        }}>
        <IcoMoon color={color || colorGreen._12} name={name} size={size || sw24} />
      </View>
      <CustomSpacer space={sh8} />
      <Text style={fs12RegGreen3}>{title}</Text>
    </Pressable>
  );
};
