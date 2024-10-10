import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { border, colorGreen, colorTransparent, rowCenterVertical, sh16, sw16, sw2, sw20 } from "../../styles";
import { CustomSpacer } from "./Spacer";

interface PinProps {
  pin: string | string[];
}

export const Pin: FunctionComponent<PinProps> = ({ pin }: PinProps) => {
  const pinConstructor = typeof pin === "string" ? Array.from({ length: 6 }, (_, i) => pin[i]) : pin;

  return (
    <View style={rowCenterVertical}>
      {pinConstructor.map((eachBox, index) => {
        const isFilled = eachBox !== undefined && eachBox !== "*";
        const borderColor = isFilled ? colorGreen._1 : colorGreen._5;
        return (
          <Fragment key={index}>
            {index === 0 ? null : <CustomSpacer isHorizontal={true} space={sw20} />}
            <View
              key={`${index}${eachBox}`}
              style={{
                ...border(borderColor, sw2, sw16),
                backgroundColor: isFilled ? colorGreen._1 : colorTransparent,
                height: sh16,
                width: sh16,
              }}
            />
          </Fragment>
        );
      })}
    </View>
  );
};
