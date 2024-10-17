import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import {
  border,
  centerVertical,
  colorBlack,
  colorGray,
  flexRow,
  fs10RegBlack2,
  fs12BoldBlack3,
  fs12RegGray11,
  fs14RegBlack1,
  fs14SemiBoldBlack3,
  px,
  rowCenterVertical,
  sw05,
  sw12,
  sw4,
  sw8,
} from "../../styles";
import { TouchableWrapper } from "../Touchables/TouchableWrapper";
import { CustomSpacer } from "./Spacer";

export const LabeledTitle: FunctionComponent<LabeledTitleProps> = ({
  headerSideContent,
  headerSideText,
  label,
  labelStyle,
  onPress,
  spaceToBottom,
  spaceToIcon,
  spaceToLabel,
  style,
  subtitle,
  subtitleStyle,
  title,
  titleIcon,
  titleIconStyle,
  titleNumberOfLines,
  titlePrefix,
  titlePrefixStyle,
  titleStyle,
}: LabeledTitleProps) => {
  const defaultIconSpace = spaceToIcon !== undefined ? spaceToIcon : sw12;
  return (
    <TouchableWrapper onPress={onPress}>
      <View style={style}>
        <View style={rowCenterVertical}>
          <Text style={{ ...fs12BoldBlack3, color: colorGray._4, ...labelStyle }}>{label}</Text>
          {headerSideContent !== undefined ? (
            <Text style={fs10RegBlack2}>headerSideContent</Text>
          ) : (
            <Fragment>
              {headerSideText !== undefined ? (
                <Fragment>
                  <CustomSpacer isHorizontal={true} space={sw8} />
                  <View style={{ ...border(colorBlack._1, sw05, sw4), ...px(sw4) }}>
                    <Text style={fs10RegBlack2}>{headerSideText}</Text>
                  </View>
                </Fragment>
              ) : null}
            </Fragment>
          )}
        </View>
        {spaceToLabel === undefined ? null : <CustomSpacer space={spaceToLabel} />}
        <View style={flexRow}>
          {titlePrefix !== undefined ? (
            <Fragment>
              <Text style={{ ...fs12RegGray11, ...titlePrefixStyle }}>{titlePrefix}</Text>
              <CustomSpacer isHorizontal={true} space={sw4} />
            </Fragment>
          ) : null}
          {title !== undefined ? (
            <Text style={{ ...fs14SemiBoldBlack3, ...titleStyle }} numberOfLines={titleNumberOfLines}>
              {title !== "" ? title : "-"}
            </Text>
          ) : null}
          {titleIcon !== undefined ? (
            <View style={{ ...flexRow, ...centerVertical, ...titleIconStyle }}>
              <CustomSpacer isHorizontal={true} space={defaultIconSpace} />
              <Text style={fs10RegBlack2}>ICON</Text>
            </View>
          ) : null}
        </View>
        {subtitle !== undefined ? <Text style={{ ...fs14RegBlack1, ...subtitleStyle }}>{subtitle}</Text> : null}
        {spaceToBottom === undefined ? null : <CustomSpacer space={spaceToBottom} />}
      </View>
    </TouchableWrapper>
  );
};
