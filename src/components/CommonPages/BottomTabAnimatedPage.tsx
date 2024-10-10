import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, ReactNode, useEffect, useRef } from "react";
import { Animated } from "react-native";

import { flexChild } from "../../styles";

interface BottomTabAnimatedPageProps {
  children: ReactNode;
}

export const BottomTabAnimatedPage: FunctionComponent<BottomTabAnimatedPageProps> = ({ children }) => {
  const isFocused = useIsFocused();
  const isTabPressRef = useRef(false);
  const scaleAnimation = useRef(new Animated.Value(isTabPressRef.current ? 0.93 : 1)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", () => {
      isTabPressRef.current = true;
    });

    if (isTabPressRef.current) {
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 150,
        // easing: Easing.ease,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        isTabPressRef.current = false;
      }, 100);
    }

    return () => {
      unsubscribe();

      if (!isFocused) {
        scaleAnimation.setValue(isTabPressRef.current ? 0.93 : 1);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, isFocused, isTabPressRef.current]);

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnimation }],
        ...flexChild,
      }}>
      {children}
    </Animated.View>
  );
};
