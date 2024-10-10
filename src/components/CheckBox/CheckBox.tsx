import React, { Fragment, FunctionComponent } from "react";
import { ColorValue, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import {
  alignSelfStart,
  centerHorizontal,
  centerHV,
  centerVertical,
  colorBlack,
  colorGray,
  colorWhite,
  disabledOpacity6,
  flexRow,
  fs12RegBlack2,
  fs12RegGray6,
  sh24,
  sw1,
  sw10,
  sw16,
  sw18,
  sw4,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

export interface CheckBoxProps {
  boxStyle?: ViewStyle;
  checkboxStyle?: ViewStyle;
  customLabel?: JSX.Element;
  disabled?: boolean;
  iconSize?: number;
  label?: string;
  labelStyle?: TextStyle;
  numberOfLines?: number;
  onPress: () => void;
  spaceToLabel?: number;
  spaceToSubLabel?: number;
  style?: ViewStyle;
  subLabel?: string;
  subLabelStyle?: TextStyle;
  toggle: boolean;
  toggleColor?: ColorValue;
}
export const CheckBox: FunctionComponent<CheckBoxProps> = ({
  boxStyle,
  checkboxStyle,
  customLabel,
  disabled,
  iconSize,
  label,
  labelStyle,
  numberOfLines,
  onPress,
  spaceToLabel,
  spaceToSubLabel,
  style,
  subLabel,
  subLabelStyle,
  toggle,
  toggleColor,
}: CheckBoxProps) => {
  const defaultColor = toggleColor !== undefined ? toggleColor : colorBlack._1;
  const selectedStyle: ViewStyle = toggle ? { backgroundColor: defaultColor, borderColor: defaultColor } : {};
  const disabledBackground: TextStyle = disabled === true ? { backgroundColor: colorGray._4 } : {};
  const disabledStyle: TextStyle = disabled === true ? { ...disabledOpacity6 } : {};
  const defaultIconSize: number = iconSize !== undefined ? iconSize : sw16;

  const toggleStyle: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderColor: colorBlack._1,
    borderRadius: sw4,
    borderWidth: sw1,
    height: sw18,
    width: sw18,
    ...centerHV,
    ...disabledBackground,
    ...disabledStyle,
    ...selectedStyle,
    ...boxStyle,
  };

  const defaultLabelSpace = spaceToLabel !== undefined ? spaceToLabel : sw10;

  const handlePress = () => {
    if (disabled !== true) {
      onPress();
    }
  };

  return (
    <View style={flexRow}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={{ ...centerVertical, ...flexRow, ...style }}>
          <View style={{ ...centerHorizontal, ...alignSelfStart, height: sh24, ...checkboxStyle }}>
            <View style={toggleStyle}>{toggle ? <IcoMoon color={colorWhite._1} name="check" size={defaultIconSize} /> : null}</View>
          </View>
          {customLabel !== undefined ? (
            <Fragment>
              <CustomSpacer isHorizontal={true} space={defaultLabelSpace} />
              {customLabel}
            </Fragment>
          ) : (
            <Fragment>
              {label === undefined ? null : (
                <Fragment>
                  <CustomSpacer isHorizontal={true} space={defaultLabelSpace} />
                  <View>
                    <Text numberOfLines={numberOfLines} style={{ ...fs12RegBlack2, lineHeight: sh24, ...disabledStyle, ...labelStyle }}>
                      {label}
                    </Text>
                    {subLabel !== undefined ? (
                      <Fragment>
                        {spaceToSubLabel !== undefined ? <CustomSpacer space={spaceToSubLabel} /> : null}
                        <Text style={{ ...fs12RegGray6, ...subLabelStyle }}>{subLabel}</Text>
                      </Fragment>
                    ) : null}
                  </View>
                </Fragment>
              )}
            </Fragment>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
