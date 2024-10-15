import "react-native-gesture-handler";
import "react-native-get-random-values";

import { AppRegistry } from "react-native";
import Geocoder from "react-native-geocoding";

import { App } from "./App";
import { name as appName } from "./app.json";
import { GOOGLE_PLACES_API_KEY } from "./src/constants";

Geocoder.init(GOOGLE_PLACES_API_KEY, { language: "en" });

AppRegistry.registerComponent(appName, () => App);
