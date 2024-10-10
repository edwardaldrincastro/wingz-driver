import React, { FunctionComponent } from "react";
import { ViewStyle } from "react-native";

import { centerHV, colorGreen, colorWhite, sw136, sw20, sw3 } from "../../styles";
import { Loading } from "../Views";
import { BasicModal } from "./Basic";

interface LoaderProps {
  label?: string;
  visible: boolean;
}

export const Loader: FunctionComponent<LoaderProps> = ({ visible, label }: LoaderProps) => {
  const modalStyle: ViewStyle = {
    ...centerHV,
    backgroundColor: colorGreen._1,
    borderRadius: sw20,
    height: sw136,
    width: sw136,
  };

  return (
    <BasicModal backdropOpacity={0.5} style={centerHV} visible={visible}>
      <Loading color={colorWhite._1} type="snail" label={label} style={modalStyle} thickness={sw3} />
    </BasicModal>
  );
};
