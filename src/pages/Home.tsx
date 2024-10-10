import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

import { IcoMoon } from "../icons";
import { centerHV, colorBlue, colorGreen, flexChild, fs16BoldBlack2, fs16MedBlack1, sh32 } from "../styles";

export const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={{ ...flexChild, ...centerHV }}>
      <IcoMoon size={sh32} name="arrow-left" color={colorGreen._0} />
      <Text style={{ ...fs16BoldBlack2, color: colorGreen._0, fontSize: 24 }}>Home Page</Text>
      <Text style={{ ...fs16MedBlack1, color: colorBlue._0 }} onPress={() => navigation.navigate("Details")}>
        Go to Details
      </Text>
    </View>
  );
};
