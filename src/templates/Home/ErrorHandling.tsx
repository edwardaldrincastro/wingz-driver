import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

import { BottomSheet, CustomFlexSpacer, CustomSpacer, LinkText } from "../../components";
import { Language } from "../../constants";
import { colorBlue, fs12BoldGray6, fs16MedBlack1, fsAlignCenter, rowCenterVertical, sh16 } from "../../styles";

const { HOME } = Language.PAGE;

interface ErrorHandlingProps {
  error: FetchBaseQueryError | SerializedError | undefined;
  isFetching: boolean;
  noNearby: boolean;
  refetch: () => void;
}

export const ErrorHandling: FunctionComponent<ErrorHandlingProps> = ({ error, isFetching, noNearby, refetch }: ErrorHandlingProps) => {
  if (isFetching) {
    return (
      <BottomSheet>
        <Text style={{ ...fs16MedBlack1, ...fsAlignCenter }}>{HOME.LABEL_GETTING_NEARBY}</Text>
      </BottomSheet>
    );
  }

  if (error !== undefined) {
    return (
      <>
        <CustomSpacer space={sh16} />
        <BottomSheet>
          <View style={rowCenterVertical}>
            <Text style={{ ...fs16MedBlack1, ...fsAlignCenter }}>{HOME.LABEL_ERROR_REQUEST}</Text>
            <CustomFlexSpacer />
            <LinkText onPress={refetch} style={{ ...fs12BoldGray6, color: colorBlue._0 }} text={HOME.BUTTON_TRY} />
          </View>
        </BottomSheet>
      </>
    );
  }

  if (noNearby) {
    return (
      <BottomSheet>
        <View style={rowCenterVertical}>
          <Text style={{ ...fs16MedBlack1, ...fsAlignCenter }}>{HOME.LABEL_NO_NEARBY}</Text>
          <CustomFlexSpacer />
          <LinkText onPress={refetch} style={{ ...fs12BoldGray6, color: colorBlue._0 }} text={HOME.BUTTON_TRY} />
        </View>
      </BottomSheet>
    );
  }

  return null;
};
