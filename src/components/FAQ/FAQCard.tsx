import React, { FunctionComponent } from "react";
import { ImageRequireSource, Pressable, Text } from "react-native";
import { Source } from "react-native-fast-image";

import { fs14RegGreen3, sh8, sh92, sw10, sw160 } from "../../styles";
import { CustomImage } from "../Images";
import { CustomSpacer } from "../Views";

interface FAQCardProps extends FAQItem {
  image: Source | ImageRequireSource;
}

export const FAQCard: FunctionComponent<FAQCardProps> = ({ image, title, onPress }) => {
  return (
    <Pressable style={{ width: sw160 }} onPress={onPress} testID="component-FAQCard">
      <CustomImage source={image} style={{ height: sh92, width: sw160, borderRadius: sw10 }} />
      <CustomSpacer space={sh8} />
      <Text style={fs14RegGreen3}>{title}</Text>
    </Pressable>
  );
};
