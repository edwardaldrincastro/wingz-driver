import { it, jest } from "@jest/globals";
import { render } from "@testing-library/react-native";
import React from "react";

import { LinkText } from "../../../src/components";

it("render basic LinkText", () => {
  const mockFn = jest.fn();
  render(<LinkText onPress={mockFn} text="Test Button" />);
});

it("render a LinkText with custom style", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<LinkText onPress={mockFn} style={{ backgroundColor: testColor }} text="Test Button" />);
});

it("render a LinkText with text style", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<LinkText onPress={mockFn} text="Test Button" style={{ color: testColor }} />);
});

it("render a LinkText with withUnderline true", () => {
  const mockFn = jest.fn();
  render(<LinkText onPress={mockFn} text="Test Button" withUnderline={true} />);
});

it("render a LinkText with withUnderline false", () => {
  const mockFn = jest.fn();
  render(<LinkText onPress={mockFn} text="Test Button" withUnderline={false} />);
});
