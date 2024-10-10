import React, { Fragment, FunctionComponent } from "react";
import { ScrollView, View } from "react-native";

import { flexRow, sh24 } from "../../styles";
import { isArrayNotEmpty } from "../../utils";
import { CustomSpacer } from "../Views";
import { FAQCard } from "./FAQCard";

interface FAQCardGroup {
  data: FAQItem[];
}

export const FAQCardGroup: FunctionComponent<FAQCardGroup> = ({ data }) => {
  return (
    <View style={flexRow} testID="component-FAQCardGroup">
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {isArrayNotEmpty(data) &&
          data.map((eachData, index) => {
            const { image, title, onPress } = eachData;
            return (
              <Fragment key={`${index}${title}`}>
                <FAQCard image={image} onPress={onPress} title={title} />
                <CustomSpacer space={sh24} isHorizontal={true} />
              </Fragment>
            );
          })}
      </ScrollView>
    </View>
  );
};
