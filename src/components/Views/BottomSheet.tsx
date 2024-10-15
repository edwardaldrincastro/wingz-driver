import React, { FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { colorWhite, px, py, sh16, shadow12Black112, sw12, sw16, sw24 } from "../../styles";

interface BottomSheetProps {
  children?: JSX.Element;
  style?: ViewStyle;
}

export const BottomSheet: FunctionComponent<BottomSheetProps> = ({ children, ...style }: BottomSheetProps) => {
  return (
    <View
      style={{
        ...px(sw16),
        ...py(sh16),
        ...shadow12Black112,
        backgroundColor: colorWhite._1,
        borderRadius: sw12,
        marginHorizontal: sw24,
        ...style,
      }}>
      {children}
    </View>
  );
};
