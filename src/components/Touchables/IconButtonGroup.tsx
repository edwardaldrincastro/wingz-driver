import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { flexRow, flexWrap, sh24, sw8 } from "../../styles";
import { isArrayNotEmpty } from "../../utils";
import { IconItem } from "./IconButton";

interface IconButtonGroupProps {
  data: IconItemProps[];
}

export const IconButtonGroup: FunctionComponent<IconButtonGroupProps> = ({ data }) => {
  return (
    <View
      style={{
        ...flexRow,
        ...flexWrap,
        rowGap: sh24,
        columnGap: sw8,
      }}>
      {isArrayNotEmpty(data) &&
        data.map((eachItem, index) => {
          const { title, name, onPress } = eachItem;
          return (
            <Fragment key={`${index}${title}`}>
              <IconItem title={title} name={name} onPress={onPress} />
            </Fragment>
          );
        })}
    </View>
  );
};
