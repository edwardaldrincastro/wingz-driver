import React, { Fragment, FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { flexChild, flexRow, sw16 } from "../../styles";
import { RoundedButton, RoundedButtonProps } from "../Touchables/RoundedButton";
import { CustomSpacer } from "./Spacer";

const { ACTION_BUTTONS } = Language.COMPONENTS;

export interface ActionButton extends Omit<RoundedButtonProps, "text"> {
  text?: string;
}

export interface ActionButtonsProps {
  buttonContainerStyle?: ViewStyle;
  primary?: ActionButton;
  secondary?: ActionButton;
}

export const ActionButtons: FunctionComponent<ActionButtonsProps> = ({ buttonContainerStyle, primary, secondary }: ActionButtonsProps) => {
  return (
    <View style={{ ...flexRow, ...buttonContainerStyle }}>
      {secondary !== undefined ? (
        <Fragment>
          <RoundedButton buttonStyle={flexChild} secondary={true} {...secondary} text={secondary.text || ACTION_BUTTONS.BUTTON_CANCEL} />
          <CustomSpacer isHorizontal={true} space={sw16} />
        </Fragment>
      ) : null}
      {primary !== undefined ? (
        <RoundedButton buttonStyle={flexChild} {...primary} text={primary.text || ACTION_BUTTONS.BUTTON_CONTINUE} />
      ) : null}
    </View>
  );
};
