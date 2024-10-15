import React, { FunctionComponent } from "react";
import { ViewStyle } from "react-native";

import { border, colorBlue, colorRed, colorTransparent, disabledOpacity5, sw12, sw2 } from "../../styles";
import { RoundedButton, RoundedButtonProps } from "./RoundedButton";

type ButtonType = "solid" | "dashed";

export interface OutlineButtonProps extends RoundedButtonProps {
  buttonType?: ButtonType;
  disabledOpacity?: number;
  color?: string;
}

export const OutlineButton: FunctionComponent<OutlineButtonProps> = ({
  buttonStyle,
  buttonType,
  disabled,
  disabledOpacity,
  color,
  textStyle,
  ...roundedButtonProps
}: OutlineButtonProps) => {
  const borderStyle: ViewStyle = buttonType === "dashed" ? { borderStyle: "dashed" } : {};
  const defaultDisabledOpacity = disabledOpacity !== undefined ? { opacity: disabledOpacity } : disabledOpacity5;
  const opacity = disabled === true ? defaultDisabledOpacity : {};
  const borderColor: ViewStyle = color !== undefined ? { borderColor: color } : { borderColor: colorBlue._0 };
  const roundedButtonStyle: ViewStyle = {
    ...border(colorRed._1, sw2),
    backgroundColor: colorTransparent,
    borderRadius: sw12,
    ...borderStyle,
    ...borderColor,
    ...opacity,
    ...buttonStyle,
  };

  const defaultColor = color || colorBlue._0;

  return (
    <RoundedButton
      {...roundedButtonProps}
      buttonStyle={roundedButtonStyle}
      iconColor={defaultColor}
      textStyle={{ color: defaultColor, ...textStyle }}
    />
  );
};
