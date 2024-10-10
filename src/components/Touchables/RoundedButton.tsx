import React, { FunctionComponent } from "react";
import { ViewStyle } from "react-native";

import { sw48 } from "../../styles";
import { CustomButton, CustomButtonProps } from "./Button";

export interface RoundedButtonProps extends CustomButtonProps {
  radius?: number;
}

export const RoundedButton: FunctionComponent<RoundedButtonProps> = ({ radius, buttonStyle, ...rest }: RoundedButtonProps) => {
  const roundedButtonStyle: ViewStyle = {
    borderRadius: radius !== undefined ? radius : sw48,
    ...buttonStyle,
  };

  return <CustomButton buttonStyle={roundedButtonStyle} {...rest} />;
};
