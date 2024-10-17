import React, { FunctionComponent } from "react";
import { Text, TextStyle, View } from "react-native";

import { colorGreen, flexWrap, fs16SemiBoldGreen1, sw2 } from "../../styles";

export interface LinkTextProps {
  onPress?: () => void;
  style?: TextStyle;
  text: string;
  withUnderline?: boolean;
}

export const LinkText: FunctionComponent<LinkTextProps> = ({ onPress, style, text, withUnderline }: LinkTextProps) => {
  const underline = withUnderline === true ? { borderBottomWidth: sw2, borderBottomColor: colorGreen._1 } : {};

  return (
    <View style={flexWrap}>
      <View style={underline}>
        <Text onPress={onPress} style={{ ...fs16SemiBoldGreen1, ...style }} suppressHighlighting={true}>
          {text}
        </Text>
      </View>
    </View>
  );
};
