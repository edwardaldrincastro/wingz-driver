import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

import { BottomSheet, CustomFlexSpacer, LinkText } from "../../components";
import { Language } from "../../constants";
import { colorBlue, fs12BoldGray6, fs16MedBlack1, fsAlignCenter, rowCenterVertical } from "../../styles";

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
        <Text style={{ ...fs16MedBlack1, ...fsAlignCenter }}>Getting nearby requests...</Text>
      </BottomSheet>
    );
  }

  if (error !== undefined) {
    return (
      <BottomSheet>
        <View style={rowCenterVertical}>
          <Text style={{ ...fs16MedBlack1, ...fsAlignCenter }}>Oops! Something went wrong.</Text>
          <CustomFlexSpacer />
          <LinkText onPress={refetch} style={{ ...fs12BoldGray6, color: colorBlue._0 }} text={HOME.BUTTON_TRY} />
        </View>
      </BottomSheet>
    );
  }

  if (noNearby) {
    return (
      <BottomSheet>
        <View style={rowCenterVertical}>
          <Text style={{ ...fs16MedBlack1, ...fsAlignCenter }}>No nearby requests.</Text>
          <CustomFlexSpacer />
          <LinkText onPress={refetch} style={{ ...fs12BoldGray6, color: colorBlue._0 }} text={HOME.BUTTON_TRY} />
        </View>
      </BottomSheet>
    );
  }

  return null;
};
