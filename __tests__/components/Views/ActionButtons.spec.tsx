import { it, jest } from "@jest/globals";
import { render } from "@testing-library/react-native";
import React from "react";

import { ActionButtons } from "../../../src/components";

it("render basic ActionButtons with Primary", () => {
  const mockFn = jest.fn();
  render(<ActionButtons primary={{ onPress: mockFn, text: "Button" }} />);
});

it("render basic ActionButtons with Secondary", () => {
  const mockFn = jest.fn();
  render(<ActionButtons primary={{ onPress: mockFn, text: "Button" }} secondary={{ onPress: mockFn, text: "Button" }} />);
});

it("render ActionButtons with Primary and styles", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<ActionButtons buttonContainerStyle={{ backgroundColor: testColor }} primary={{ onPress: mockFn, text: "Button" }} />);
});
