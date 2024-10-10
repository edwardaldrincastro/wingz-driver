import React, { Fragment, FunctionComponent, useEffect } from "react";
import { Pressable, Text, TextStyle, View, ViewStyle } from "react-native";
import { ImageStyle } from "react-native-fast-image";
import Animated, { interpolateColor, ReduceMotion, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  centerHorizontal,
  centerVertical,
  colorBlack,
  colorGray,
  colorTransparent,
  colorWhite,
  flexChild,
  fs16RegGray9,
  fs24SemiBoldGreen3,
  fsAlignCenter,
  fullHW,
  fullWidth,
  px,
  sh198,
  sh24,
  sh36,
  sh4,
  sh8,
  sw220,
  sw24,
  sw342,
  sw36,
  sw4,
  sw8,
} from "../../styles";
import { CustomImage } from "../Images";
import { LinkText, RoundedButton } from "../Touchables";
import { CustomSpacer } from "../Views";

interface BottomSliderPageProps {
  containerStyle?: ViewStyle;
  customRender?: JSX.Element;
  image?: number;
  imageStyle?: ImageStyle;
  onDismiss: () => void;
  primaryButton?: BaseTouchable;
  secondaryButton?: BaseTouchable;
  subtitle?: string;
  title?: string;
  titleStyle?: TextStyle;
}

export const BottomSliderPage: FunctionComponent<BottomSliderPageProps> = ({
  containerStyle,
  customRender,
  image,
  imageStyle,
  onDismiss,
  primaryButton,
  secondaryButton,
  subtitle,
  title,
  titleStyle,
}) => {
  const { bottom } = useSafeAreaInsets();
  const topPosition = useSharedValue(500);
  const backgroundOpacity = useSharedValue(0);

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(backgroundOpacity.value, [0, 1], [colorTransparent, colorBlack._1_4]),
    };
  });

  const onFocusAnimation = () => {
    topPosition.value = withSpring(0, {
      mass: 1,
      damping: 30,
      stiffness: 200,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
      reduceMotion: ReduceMotion.System,
    });

    backgroundOpacity.value = withSpring(1, {
      mass: 1,
      damping: 30,
      stiffness: 192,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
      reduceMotion: ReduceMotion.System,
    });
  };

  const onExitAnimation = (callBackFn?: () => void) => {
    topPosition.value = withSpring(500, {
      mass: 1,
      damping: 30,
      stiffness: 192,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
      reduceMotion: ReduceMotion.System,
    });
    backgroundOpacity.value = withSpring(0, {
      mass: 1,
      damping: 30,
      stiffness: 192,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
      reduceMotion: ReduceMotion.System,
    });

    if (callBackFn) {
      setTimeout(() => {
        callBackFn();
      }, 350);
    }
  };

  const handleOnDismissAnimation = () => {
    onExitAnimation(onDismiss);
  };

  const handlePrimaryButton = () => {
    onDismiss();
    onExitAnimation(primaryButton ? primaryButton.onPress : undefined);
  };

  const handleSecondaryButton = () => {
    onExitAnimation(secondaryButton ? secondaryButton.onPress : undefined);
  };

  const containerView: ViewStyle = {
    ...centerVertical,
    ...px(sw24),
    backgroundColor: colorWhite._1,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
    ...containerStyle,
  };

  useEffect(() => {
    onFocusAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={flexChild}>
      <Animated.View
        style={[
          {
            ...fullHW,
            ...flexChild,
            backgroundColor: colorBlack._1_4,
          },
          backgroundAnimatedStyle,
        ]}>
        <Pressable onPress={handleOnDismissAnimation} style={flexChild} />

        <Animated.View style={[containerView, { top: topPosition }]}>
          <View style={centerVertical}>
            <CustomSpacer space={sh8} />
            <View style={{ backgroundColor: colorGray._10, borderRadius: sw4, height: sh4, width: sw36 }} />
            <CustomSpacer space={sh8} />
          </View>
          <CustomSpacer space={sh8} />

          {!customRender && typeof image === "number" ? (
            <Fragment>
              <CustomImage source={image} style={{ width: sw220, height: sh198, ...imageStyle }} />
              <CustomSpacer space={sh24} />
              <Text style={{ ...fs24SemiBoldGreen3, ...titleStyle }}>{title}</Text>
              <CustomSpacer space={sh8} />
              <Text style={{ width: sw342, ...fsAlignCenter, ...fs16RegGray9 }}>{subtitle}</Text>
            </Fragment>
          ) : null}

          {customRender && <Fragment>{customRender}</Fragment>}
          <CustomSpacer space={sh24} />
          {primaryButton && (
            <Fragment>
              <RoundedButton buttonStyle={fullWidth} onPress={handlePrimaryButton} text={primaryButton.title} />
              <CustomSpacer space={sh8} />
            </Fragment>
          )}
          {secondaryButton && (
            <Fragment>
              <Pressable onPress={handleSecondaryButton} style={{ height: sh36, ...centerHorizontal }}>
                <LinkText text={secondaryButton.title} />
              </Pressable>
              <CustomSpacer space={sh8} />
            </Fragment>
          )}

          <CustomSpacer space={bottom} />
        </Animated.View>
      </Animated.View>
    </View>
  );
};
