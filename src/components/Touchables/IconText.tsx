import debounce from "lodash.debounce";
import React, { FunctionComponent, useCallback, useState } from "react";
import { ColorValue, Pressable, Text, TextStyle, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import { centerVertical, colorGreen, colorTransparent, disabledOpacity5, flexRow, fs14MedGreen1, sh20, sw20, sw4 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

interface IconTextProps {
  color?: string;
  disabled?: boolean;
  iconPosition?: "left" | "right";
  iconSize?: number;
  name: string;
  onPress?: () => void;
  spaceBetween?: number;
  style?: ViewStyle;
  text: string;
  textStyle?: TextStyle;
  withDebounce?: boolean;
  withHover?: { color: ColorValue };
}

export const IconText: FunctionComponent<IconTextProps> = ({
  color,
  disabled,
  iconPosition,
  iconSize,
  name,
  onPress,
  spaceBetween,
  style,
  text,
  textStyle,
  withDebounce,
  withHover,
}: IconTextProps) => {
  const [hover, setHover] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncePress = useCallback(
    debounce(onPress !== undefined ? onPress : () => {}, 1000, {
      leading: true,
      trailing: false,
    }),
    [onPress],
  );

  const handlePress = () => {
    if (onPress !== undefined) {
      if (withDebounce === true) {
        debouncePress();
      } else {
        onPress();
      }
    }
  };

  const flexDirection: ViewStyle = iconPosition === "right" ? { flexDirection: "row-reverse" } : flexRow;

  const defaultButtonStyle: ViewStyle = {
    ...centerVertical,
    ...flexDirection,
    ...style,
  };
  const textColor = color ? { color: color } : {};
  const defaultTextStyle: TextStyle = {
    ...fs14MedGreen1,
    ...textColor,
    lineHeight: sh20,
    ...textStyle,
  };

  const defaultSpaceBetween = spaceBetween !== undefined ? spaceBetween : sw4;
  const defaultSize = iconSize !== undefined ? iconSize : sw20;
  const defaultColor = color !== undefined ? color : colorGreen._1;

  const defaultBgColor = style !== undefined && style.backgroundColor !== undefined ? style.backgroundColor : colorTransparent;
  const bgColor = withHover !== undefined && hover === true ? withHover.color : defaultBgColor;
  const disabledOpacity = disabled === true ? disabledOpacity5 : {};

  return (
    <Pressable
      disabled={disabled}
      onPress={handlePress}
      onPressIn={() => setHover(true)}
      onPressOut={() => setHover(false)}
      style={{ ...defaultButtonStyle, backgroundColor: bgColor, ...disabledOpacity }}>
      <IcoMoon color={defaultColor} name={name} size={defaultSize} />
      <CustomSpacer isHorizontal={true} space={defaultSpaceBetween} />
      <Text style={defaultTextStyle}>{text}</Text>
    </Pressable>
  );
};
