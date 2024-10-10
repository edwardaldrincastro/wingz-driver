import React, { Fragment, FunctionComponent, ReactNode, useEffect, useState } from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import * as Animatable from "react-native-animatable";

import { Language } from "../../constants";
import { useBackgroundTimer } from "../../hooks";
import {
  absolutePosition,
  centerHorizontal,
  centerVertical,
  colorBlack,
  colorBlue,
  colorWhite,
  flexChild,
  flexRow,
  fs14RegWhite4,
  fs16MedGreen16,
  fullWidth,
  justifyContentEnd,
  px,
  sh16,
  sh34,
  sh48,
  sw10,
  sw16,
  sw24,
  sw62,
  sw8,
} from "../../styles";
import { IconButton } from "../Touchables";
import { CustomSpacer } from "../Views";

const { TOAST } = Language.PAGE;

export interface CustomToastProps {
  animationIn?: Animatable.Animation;
  animationOut?: Animatable.Animation;
  children?: ReactNode;
  contentStyle?: ViewStyle;
  count?: number;
  deleteText?: string;
  disabledAnimation?: boolean;
  duration?: number;
  isDeleteToast?: boolean;
  onPress?: () => void;
  parentVisible?: boolean;
  RenderContent?: () => JSX.Element;
  setCount?: (currentCount: number) => void;
  setParentVisible?: (currentVisibility: boolean) => void;
  style?: ViewStyle;
  toastStyle?: ViewStyle;
}

export const CustomToast: FunctionComponent<CustomToastProps> = ({
  animationIn,
  animationOut,
  contentStyle,
  count,
  deleteText,
  disabledAnimation,
  duration,
  isDeleteToast,
  onPress,
  parentVisible,
  RenderContent,
  setCount,
  setParentVisible,
  style,
  toastStyle,
}: CustomToastProps) => {
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const [tempVisible, setTempVisible] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(parentVisible !== undefined ? parentVisible : false);
  const defaultDuration = duration !== undefined ? duration : 3;
  // this component has dependency on react-native-background-timer package
  // need to use this over pure js such as setInterval & clearInterval
  // because in this app, timer of the toast needs to still run in background
  // and a functionality need to be run when the toast timer finished
  // pure js will result in the function to not run and the timer will stop when opening another app
  const { timer, setTimer, clearTimerInterval } = useBackgroundTimer(defaultDuration);

  const handlePress = () => {
    if (onPress !== undefined) {
      onPress();
      if (setCount !== undefined) {
        setCount(0);
      }
      setVisible(false);
      setTimer(3);
    } else {
      setVisible(false);
      if (setCount !== undefined) {
        setCount(0);
      }
      setFadeOut(true);
      setTimer(defaultDuration);
    }
  };

  const handleVisible = () => {
    if (visible === false) {
      setTempVisible(false);
      if (setParentVisible !== undefined) {
        setParentVisible(false);
      }
    }
  };

  useEffect(() => {
    if (visible === true) {
      if (timer > 0) {
        setTimeout(() => {
          setTimer(timer - 1);
        }, 1000);
      } else {
        setVisible(false);
        setTimer(defaultDuration);
        if (setCount !== undefined) {
          setCount(0);
        }
      }
    } else {
      clearTimerInterval();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, timer]);

  useEffect(() => {
    if (count !== 0) {
      setVisible(true);
      setTempVisible(true);
      if (count !== undefined && count > 1) {
        setTimer(timer + defaultDuration / 2);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    if (parentVisible !== undefined && parentVisible === true) {
      setVisible(true);
      setTempVisible(true);
    } else {
      setVisible(false);
      setTempVisible(false);
    }
  }, [parentVisible]);

  useEffect(() => {
    if (duration !== undefined) {
      setTimer(duration);
    }
    setFadeOut(false);

    return () => {
      setTimer(defaultDuration);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempVisible]);

  const containerStyle: ViewStyle = {
    bottom: sh34,
    ...flexRow,
    ...fullWidth,
    ...justifyContentEnd,
    ...absolutePosition,
    ...px(sw24),
    ...style,
  };
  const contentContainerStyle: ViewStyle = {
    backgroundColor: colorBlack._8,
    borderRadius: sw10,
    ...fullWidth,
    ...contentStyle,
  };

  const textContainerStyle: ViewStyle = {
    ...flexChild,
    ...flexRow,
    ...centerVertical,
    borderTopLeftRadius: sw8,
    borderBottomLeftRadius: sw8,
  };

  const sideContainerStyle: ViewStyle = {
    ...flexRow,
    ...centerVertical,
    ...centerHorizontal,
    height: sh48,
  };

  const undoContainerStyle: ViewStyle = {
    width: sw62,
    backgroundColor: colorBlack._8,
    borderTopRightRadius: sw8,
    borderBottomRightRadius: sw8,
    ...sideContainerStyle,
  };

  const defaultDeletedText = deleteText !== undefined ? deleteText : TOAST.LABEL_CREDENTIALS_DELETED;

  const toastContent =
    isDeleteToast !== undefined && isDeleteToast === true ? (
      <View style={{ ...flexRow, ...toastStyle }}>
        <CustomSpacer isHorizontal={true} space={sw16} />
        <View style={textContainerStyle}>
          <Text style={{ ...fs14RegWhite4, lineHeight: sh16 }}>{`${count} ${defaultDeletedText}`}</Text>
        </View>
        <CustomSpacer isHorizontal={true} space={sw16} />
        <View style={{ backgroundColor: colorWhite._1 }}>
          <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
            <View style={undoContainerStyle}>
              <Text style={fs16MedGreen16}>{TOAST.LABEL_UNDO}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View style={{ ...flexRow, ...px(sw16), ...toastStyle }}>
        <View style={textContainerStyle}>
          <Text style={{ ...fs14RegWhite4, lineHeight: sh16 }}>{TOAST.LABEL_DEFAULT}</Text>
        </View>
        <CustomSpacer isHorizontal={true} space={sw16} />
        <View style={sideContainerStyle}>
          <IconButton color={colorBlue._4} name="close" onPress={handlePress} size={sw16} />
        </View>
      </View>
    );

  const defaultAnimationIn: Animatable.Animation = animationIn !== undefined ? animationIn : "slideInUp";
  const defaultPropAnimationOut: Animatable.Animation = animationOut !== undefined ? animationOut : "fadeOut";
  const defaultAnimationOut: Animatable.Animation = fadeOut === false ? "slideOutDown" : defaultPropAnimationOut;
  const defaultAnimation = visible === true ? defaultAnimationIn : defaultAnimationOut;

  return (
    <Fragment>
      {tempVisible === true ? (
        <Fragment>
          <View style={containerStyle}>
            <Animatable.View
              animation={disabledAnimation === true ? undefined : defaultAnimation}
              duration={1000}
              style={contentContainerStyle}
              onAnimationEnd={handleVisible}>
              {RenderContent !== undefined ? <RenderContent /> : toastContent}
            </Animatable.View>
          </View>
        </Fragment>
      ) : null}
    </Fragment>
  );
};
