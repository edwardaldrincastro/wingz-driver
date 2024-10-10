import React, { FunctionComponent } from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import { colorGreen, fs16MedGreen3, px, rowCenterVertical, sh72, spaceBetweenHorizontal, sw24 } from "../../styles";

interface CustomHeaderProps {
  customStyle?: ViewStyle;
  leftIcon?: BaseIcoMoon;
  renderTitle?: React.JSX.Element;
  rightIcon?: BaseIcoMoon;
  title?: string;
}

export const CustomHeader: FunctionComponent<CustomHeaderProps> = ({ leftIcon, renderTitle, rightIcon, title, customStyle }) => {
  return (
    <View style={{ height: sh72, ...rowCenterVertical, ...px(sw24), ...spaceBetweenHorizontal, ...customStyle }}>
      {leftIcon ? (
        <Pressable onPress={leftIcon.onPress}>
          <IcoMoon color={leftIcon.color || colorGreen._1} name={leftIcon.name || "arrow-left"} size={leftIcon.size || sw24} />
        </Pressable>
      ) : (
        <View style={{ width: sw24 }} />
      )}
      {renderTitle || <Text style={fs16MedGreen3}>{title}</Text>}
      {rightIcon ? (
        <Pressable onPress={rightIcon.onPress}>
          <IcoMoon color={rightIcon.color || colorGreen._1} name={rightIcon.name || "close"} size={rightIcon.size || sw24} />
        </Pressable>
      ) : (
        <View style={{ width: sw24 }} />
      )}
    </View>
  );
};
