import React, { FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import { centerHV, colorBlack, colorGreen, colorWhite, fs16MedWhite1, px, py, sh32, sh4, sh48, sw136, sw20, sw3 } from "../../styles";
import { CustomSpacer, Loading } from "../Views";
import { BasicModal } from "./Basic";

interface ToastModalProps {
  label?: string;
  isLoading?: boolean;
  visible: boolean;
}

export const ToastModal: FunctionComponent<ToastModalProps> = ({ label, isLoading, visible }: ToastModalProps) => {
  const modalStyle: ViewStyle = {
    ...centerHV,
    backgroundColor: colorGreen._2,
    borderRadius: sw20,
    height: sw136,
    width: sw136,
  };

  const containerStyle: ViewStyle = {
    ...centerHV,
    ...px(sw20),
    ...py(sh32),
    backgroundColor: colorGreen._2,
    borderRadius: sw20,
    height: sw136,
    width: sw136,
  };

  return (
    <BasicModal backdropOpacity={0.2} style={{ backgroundColor: colorBlack._1_4, ...centerHV }} visible={visible}>
      {isLoading === true ? (
        <Loading color={colorWhite._1} type="snail" style={modalStyle} thickness={sw3} />
      ) : (
        <View style={containerStyle}>
          <IcoMoon color={colorWhite._1} name="check" size={sh48} />
          <CustomSpacer space={sh4} />
          <Text style={fs16MedWhite1}>{label}</Text>
        </View>
      )}
    </BasicModal>
  );
};
