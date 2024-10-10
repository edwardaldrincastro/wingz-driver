import React, { Fragment, FunctionComponent } from "react";
import { Image, ImageSourcePropType, ImageStyle, Text, TextStyle, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import {
  centerVertical,
  colorBlue,
  colorWhite,
  flexRow,
  flexRowCC,
  fs14RegGray9,
  fs16MedBlack1,
  fs16SemiBoldGreen1,
  fsAlignCenter,
  fsTransformNone,
  imageContain,
  px,
  py,
  sh16,
  sh24,
  sh28,
  sh8,
  sh96,
  sw10,
  sw136,
  sw152,
  sw16,
  sw28,
  sw342,
} from "../../styles";
import { ActionButtons, ActionButtonsProps } from "../Views/ActionButtons";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";

export interface PromptProps extends ActionButtonsProps {
  children?: JSX.Element;
  closable?: boolean;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  handleClose?: () => void;
  illustration?: ImageSourcePropType;
  illustrationStyle?: ImageStyle;
  label?: string;
  labelStyle?: TextStyle;
  spaceToButton?: number;
  spaceToIllustration?: number;
  spaceToTitle?: number;
  spaceToTop?: number;
  title?: string;
  titleStyle?: TextStyle;
}

export const Prompt: FunctionComponent<PromptProps> = ({
  // spaceToButton,
  // spaceToTop,
  children,
  closable,
  containerStyle,
  contentStyle,
  handleClose,
  illustration,
  illustrationStyle,
  label,
  labelStyle,
  spaceToIllustration,
  spaceToTitle,
  title,
  titleStyle,
  ...rest
}: PromptProps) => {
  const modalContainer: ViewStyle = {
    backgroundColor: colorWhite._3,
    borderRadius: sw10,
    ...px(sw16),
    ...py(sh24),
    width: sw342,
    ...containerStyle,
  };

  const buttonContainer: ViewStyle = {
    ...flexRowCC,
    borderBottomLeftRadius: sw10,
    borderBottomRightRadius: sw10,
    height: sh96,
    ...rest.buttonContainerStyle,
  };
  const buttonStyle: ViewStyle = { width: sw152 };

  const actionButtonProps: ActionButtonsProps = {
    cancelButtonStyle: buttonStyle,
    cancelTextStyle: fs16SemiBoldGreen1,
    continueTextStyle: fsTransformNone,
    continueButtonStyle: buttonStyle,
    buttonContainerStyle: buttonContainer,
    ...rest,
  };

  const defaultIllustrationStyle: ImageStyle = { ...imageContain, height: sw136, width: sw136, ...illustrationStyle };
  const defaultSpaceToTitle = spaceToTitle !== undefined ? spaceToTitle : sh16;

  return (
    <View style={modalContainer}>
      {closable === true ? (
        <Fragment>
          <CustomSpacer space={sh28} />
          <View style={flexRow}>
            <CustomFlexSpacer />
            <IcoMoon color={colorBlue._1} name="close" onPress={handleClose} size={sh24} suppressHighlighting={true} />
            <CustomSpacer isHorizontal={true} space={sw28} />
          </View>
        </Fragment>
      ) : null}

      <View style={{ ...centerVertical, ...contentStyle }}>
        {illustration !== undefined ? (
          <Fragment>
            <Image source={illustration} style={defaultIllustrationStyle} />
            <CustomSpacer space={spaceToIllustration || sh8} />
          </Fragment>
        ) : null}

        {label !== undefined ? (
          <Fragment>
            <Text style={{ ...fs16MedBlack1, ...fsAlignCenter, ...labelStyle }}>{label}</Text>
            <CustomSpacer space={defaultSpaceToTitle} />
          </Fragment>
        ) : null}

        {title !== undefined ? <Text style={{ ...fs14RegGray9, ...fsAlignCenter, ...titleStyle }}>{title}</Text> : null}
        {children}
      </View>

      <CustomSpacer space={sh16} />

      {rest.labelCancel === undefined &&
      rest.labelContinue === undefined &&
      rest.handleCancel === undefined &&
      rest.handleContinue === undefined ? null : (
        <View>
          <ActionButtons {...actionButtonProps} buttonContainerStyle={{}} />
        </View>
      )}
    </View>
  );
};
