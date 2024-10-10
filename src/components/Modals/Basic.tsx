import React, { Fragment, FunctionComponent } from "react";
import Modal from "react-native-modal";

import { colorBlack, noMargin } from "../../styles";

export const BasicModal: FunctionComponent<IBasicModalProps> = ({
  animationIn,
  animationInTiming,
  animationOut,
  animationOutTiming,
  backdropColor,
  backdropOpacity,
  hasBackdrop,
  children,
  onClose,
  style,
  testId,
  visible,
}: IBasicModalProps) => {
  const defaultAnimationIn = animationIn !== undefined ? animationIn : "fadeIn";
  const defaultAnimationOut = animationOut !== undefined ? animationOut : "fadeOut";

  const handleClose = () => {
    if (onClose !== undefined) {
      onClose();
    }
  };

  const isVisible = visible;

  return (
    <Modal
      animationIn={defaultAnimationIn}
      animationInTiming={animationInTiming}
      animationOut={defaultAnimationOut}
      animationOutTiming={animationOutTiming}
      backdropColor={backdropColor || colorBlack._1}
      backdropOpacity={backdropOpacity || 0.7}
      backdropTransitionOutTiming={0}
      hasBackdrop={hasBackdrop}
      isVisible={isVisible}
      onModalHide={handleClose}
      style={{ ...noMargin, ...style }}
      testID={testId}>
      <Fragment>{isVisible === true ? <Fragment>{children}</Fragment> : null}</Fragment>
    </Modal>
  );
};
