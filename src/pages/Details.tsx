import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

import { centerHV, flexChild } from "../styles";

export const Details = () => {
  const navigation = useNavigation();

  return (
    <View style={{ ...flexChild, ...centerHV }}>
      <Text>Details Page</Text>
      <Text onPress={() => navigation.navigate("Home")}>Go to Home</Text>
    </View>
  );
};
