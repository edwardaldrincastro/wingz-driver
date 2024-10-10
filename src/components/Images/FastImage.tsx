import React, { FunctionComponent } from "react";
import FastImage, { FastImageProps } from "react-native-fast-image";

// TODO check FastImageStaticProperties prop type
interface CustomFastImageProps extends FastImageProps {
  testId?: string;
}

export const CustomImage: FunctionComponent<CustomFastImageProps> = (props: CustomFastImageProps) => {
  const defaultResizeMode = props.resizeMode ? FastImage.resizeMode[props.resizeMode] : FastImage.resizeMode.contain;

  return <FastImage {...props} resizeMode={defaultResizeMode} />;
};
