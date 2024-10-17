import debounce from "lodash.debounce";
import React, { FunctionComponent, useCallback, useState } from "react";
import { Pressable } from "react-native";

import { IcoMoon } from "../../icons";
import { centerHV, colorTransparent, colorWhite, disabledOpacity5, sh20 } from "../../styles";

export const IconButton: FunctionComponent<IconButtonProps> = ({
  color,
  disabled,
  name,
  onPress,
  size,
  style,
  testId,
  withDebounce,
  withHover,
}: IconButtonProps) => {
  const [hover, setHover] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncePress = useCallback(
    debounce(onPress !== undefined ? onPress : () => {}, 1000, {
      leading: true,
      trailing: false,
    }),
    [onPress],
  );

  const handlePress = () => {
    if (onPress !== undefined) {
      if (withDebounce === true) {
        debouncePress();
      } else {
        onPress();
      }
    }
  };

  const defaultSize = size !== undefined ? size : sh20;
  const defaultBgColor = style !== undefined && style.backgroundColor !== undefined ? style.backgroundColor : colorTransparent;
  const defaultColor = color !== undefined ? color : colorWhite._1;
  const bgColor = withHover !== undefined && hover === true ? withHover.color : defaultBgColor;
  const disabledOpacity = disabled === true ? disabledOpacity5 : {};

  return (
    <Pressable
      disabled={disabled}
      onPress={handlePress}
      onPressIn={() => setHover(true)}
      onPressOut={() => setHover(false)}
      style={{ ...centerHV, ...style, backgroundColor: bgColor, ...disabledOpacity }}
      testID={testId}>
      <IcoMoon testID={name} color={defaultColor} name={name} size={defaultSize} />
    </Pressable>
  );
};
