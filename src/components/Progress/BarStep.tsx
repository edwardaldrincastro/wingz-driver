import React, { Fragment, FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { CustomSpacer } from "../../components";
import { colorGray, colorGreen, flexRowCC, sh4, sw24, sw4, sw40, sw48, sw78 } from "../../styles";

interface BarStepProps {
  activeIndex: number;
  numberOfSteps: number;
}

export const BarStep: FunctionComponent<BarStepProps> = ({ activeIndex, numberOfSteps }) => {
  const steps = [...Array(numberOfSteps).keys()];

  const baseStyle: ViewStyle = { borderRadius: sw4, height: sh4, width: numberOfSteps < 3 ? sw78 : sw48 };

  return (
    <View style={flexRowCC}>
      {steps.map((eachStep, index) => {
        const currentStep = activeIndex === eachStep;
        return (
          <Fragment key={index}>
            {index === 0 ? null : <CustomSpacer space={sw4} isHorizontal={true} />}
            {currentStep ? (
              <View style={{ ...baseStyle, backgroundColor: colorGreen._6 }}>
                <View style={{ ...baseStyle, width: numberOfSteps < 3 ? sw40 : sw24, backgroundColor: colorGreen._2 }} />
              </View>
            ) : (
              <View style={{ ...baseStyle, backgroundColor: activeIndex > eachStep ? colorGreen._2 : colorGray._10 }} />
            )}
          </Fragment>
        );
      })}
    </View>
  );
};
