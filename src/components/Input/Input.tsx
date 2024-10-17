import React, { Fragment, FunctionComponent, RefObject, useState } from "react";
import { NativeSyntheticEvent, Text, TextInput, TextInputFocusEventData, TextInputProps, TextStyle, View, ViewStyle } from "react-native";

import { GalanoClassicMedium } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  border,
  centerVertical,
  colorGray,
  colorGreen,
  colorRed,
  colorTransparent,
  colorWhite,
  customShadow,
  disabledOpacity6,
  flexChild,
  flexRow,
  fs12RegRed1,
  fs14RegGray9,
  fs16RegGray6,
  px,
  sh16,
  sh4,
  sh55,
  sh56,
  sh6,
  sw1,
  sw16,
  sw24,
  sw336,
  sw362,
  sw4,
  sw8,
} from "../../styles";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";

export interface CustomTextInputProps extends TextInputProps {
  clearAll?: boolean;
  containerStyle?: ViewStyle;
  count?: number | string;
  disabled?: boolean;
  error?: string;
  errorTextStyle?: TextStyle;
  hintText?: string;
  increaseErrorWidth?: boolean;
  inputPrefix?: string;
  label?: string;
  labelStyle?: TextStyle;
  leftIcon?: BaseIcoMoon;
  maxLetterCount?: number | string;
  noBorder?: boolean;
  onPressLabel?: () => void;
  prefixStyle?: TextStyle;
  rightIcon?: BaseIcoMoon;
  setRef?: string | ((instance: TextInput | null) => void) | RefObject<TextInput> | null;
  spaceToBottom?: number;
  spaceToLabel?: number;
  spaceToTop?: number;
  style?: TextStyle;
  testID?: string;
  viewStyle?: ViewStyle;
}

export const CustomTextInput: FunctionComponent<CustomTextInputProps> = ({
  clearAll,
  containerStyle,
  count,
  disabled,
  error,
  errorTextStyle,
  hintText,
  increaseErrorWidth,
  inputPrefix,
  label,
  labelStyle,
  leftIcon,
  maxLetterCount,
  noBorder,
  onBlur,
  onFocus,
  onLayout,
  onPressLabel,
  placeholder,
  prefixStyle,
  rightIcon,
  setRef,
  spaceToBottom,
  spaceToLabel,
  spaceToTop,
  style,
  testID,
  value,
  viewStyle,
  ...textInputProps
}: CustomTextInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const borderWidth = noBorder === true ? { borderWidth: 0 } : {};
  const disabledOpacity = disabled === true ? { ...disabledOpacity6 } : {};
  const disabledStyle = disabled === true ? { ...disabledOpacity } : {};
  const errorStyle: ViewStyle = error !== undefined ? { borderWidth: sw1, borderColor: colorRed._1 } : {};
  const focusedShadow = isFocused ? customShadow(colorGreen._1, 0, 0, 0.02, sw4) : {};

  const defaultContainerStyle: ViewStyle = {
    paddingTop: spaceToTop !== undefined ? spaceToTop : 0,
    paddingBottom: spaceToBottom !== undefined ? spaceToBottom : 0,
  };

  const defaultBorderColor = disabled ? colorGreen._6 : colorGray._3;

  const defaultInputStyle: ViewStyle = {
    ...border(isFocused ? colorGreen._1 : defaultBorderColor, sw1, sw8),
    ...centerVertical,
    ...flexRow,
    ...px(isFocused === false && error === undefined ? sw16 : sw16),
    backgroundColor: colorWhite._1,
    height: sh56,
    ...borderWidth,
    ...focusedShadow,
    ...errorStyle,
    ...disabledStyle,
    ...viewStyle,
  };

  const inputStyle: TextStyle = {
    ...flexChild,
    color: disabled === true ? colorGreen._6 : colorGreen._3,
    fontFamily: GalanoClassicMedium,
    fontSize: sh16,
    height: isFocused ? sh56 : sh55, // height is more than the input view size to adjust the keyboard avoiding view
    // paddingVertical: 1, // hotfix for iOS input wrapping with long text
    ...style,
  };

  const disabledLabelStyle: TextStyle = disabled === true ? { color: colorGreen._6 } : {};

  const defaultLabelStyle: TextStyle = {
    ...fs14RegGray9,
    paddingBottom: spaceToLabel || sh6,
    ...disabledLabelStyle,
    ...labelStyle,
  };

  const errorWidthStyle: TextStyle = {
    // width: increaseErrorWidth ? sw362 : sw336,
    lineHeight: sh16,
    ...fs12RegRed1,
    ...errorTextStyle,
  };

  const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onBlur) {
      onBlur(event);
    }
    setIsFocused(false);
  };

  const handleClear = () => {
    if (textInputProps.onChangeText !== undefined) {
      textInputProps.onChangeText("");
    }
  };

  const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onFocus) {
      onFocus(event);
    }
    setIsFocused(true);
  };

  return (
    <View onLayout={onLayout} style={{ ...defaultContainerStyle, ...containerStyle }}>
      {label === undefined ? null : (
        <Text onPress={onPressLabel} style={defaultLabelStyle} suppressHighlighting={true}>
          {label}
        </Text>
      )}
      <View style={defaultInputStyle}>
        {leftIcon === undefined ? null : (
          <Fragment>
            <IcoMoon
              color={leftIcon.color || colorGreen._1}
              name={leftIcon.name}
              onPress={disabled === true ? undefined : leftIcon.onPress}
              size={leftIcon.size || sw24}
              suppressHighlighting={true}
            />
            <CustomSpacer isHorizontal={true} space={sw16} />
          </Fragment>
        )}
        {inputPrefix !== undefined ? (
          <Fragment>
            <Text style={{ ...fs16RegGray6, ...prefixStyle }}>{inputPrefix}</Text>
            <CustomSpacer isHorizontal={true} space={sw8} />
          </Fragment>
        ) : null}
        <TextInput
          autoCorrect={false}
          editable={!disabled}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          placeholderTextColor={colorGray._4}
          ref={setRef}
          selectionColor={colorGreen._1}
          spellCheck={false}
          style={inputStyle}
          testID={testID}
          underlineColorAndroid={colorTransparent}
          value={value}
          {...textInputProps}
        />
        {clearAll === true && value !== "" && rightIcon === undefined && isFocused === true ? (
          <Fragment>
            <IcoMoon color={colorGreen._5} name="close-circle-filled" onPress={handleClear} size={sw24} suppressHighlighting={true} />
          </Fragment>
        ) : null}
        {rightIcon === undefined ? null : (
          <Fragment>
            <CustomSpacer isHorizontal={true} space={sw16} />
            <IcoMoon
              color={rightIcon.color || colorGreen._1}
              name={rightIcon.name}
              onPress={disabled === true ? undefined : rightIcon.onPress}
              size={rightIcon.size || sw24}
              suppressHighlighting={true}
            />
          </Fragment>
        )}
      </View>
      <View style={{ width: increaseErrorWidth ? sw362 : sw336 }}>
        {error !== undefined || count !== undefined ? (
          <Fragment>
            <CustomSpacer space={sh4} />
            <View style={flexRow}>
              {error && <Text style={errorWidthStyle}>{error}</Text>}
              {!error && hintText && <Text style={errorWidthStyle}>{hintText}</Text>}
              <CustomFlexSpacer />
              {count && (
                <Fragment>
                  <Text style={errorWidthStyle}>
                    {count}/{maxLetterCount || 100}
                  </Text>
                </Fragment>
              )}
            </View>
          </Fragment>
        ) : null}
      </View>
    </View>
  );
};
