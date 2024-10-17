import { describe, it } from "@jest/globals";
import { render } from "@testing-library/react-native";
import React from "react";
import { View } from "react-native";

import { SafeAreaPage } from "../../../src/components";

describe("Unit Testing for Safe Area Page", () => {
  it("render a basic Safe Area Page", () => {
    render(
      <SafeAreaPage>
        <View />
      </SafeAreaPage>,
    );
  });
});

describe("Unit Testing for Safe Area Page with top color", () => {
  it("render a basic Safe Area Page with top color", () => {
    render(
      <SafeAreaPage topBackgroundColor="#fff">
        <View />
      </SafeAreaPage>,
    );
  });
});

describe("Unit Testing for Safe Area Page with bottom color", () => {
  it("render a basic Safe Area Page with bottom color", () => {
    render(
      <SafeAreaPage bottomBackgroundColor="#fff">
        <View />
      </SafeAreaPage>,
    );
  });
});

describe("Unit Testing for Safe Area Page with bottom space", () => {
  it("render a basic Safe Area Page with bottom space", () => {
    render(
      <SafeAreaPage bottomSpace={20}>
        <View />
      </SafeAreaPage>,
    );
  });
});
