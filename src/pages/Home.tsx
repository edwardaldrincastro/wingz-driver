import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

import { centerHV, flexChild } from "../styles";

export const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={{ ...flexChild, ...centerHV }}>
      <Text>Home Page</Text>
      <Text onPress={() => navigation.navigate("Details")}>Go to Details</Text>
    </View>
  );
};
