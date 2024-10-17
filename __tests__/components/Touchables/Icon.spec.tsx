import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { IconButton } from "../../../src/components";
import { colorTransparent } from "../../../src/styles";

describe("Unit testing for IconButton", () => {
  it("render basic IconButton", () => {
    const mockFn = jest.fn();
    render(<IconButton name="origin" onPress={mockFn} />);
  });

  it("render a IconButton with custom style", () => {
    const mockFn = jest.fn();
    const testColor = "#fff";
    render(<IconButton name="origin" onPress={mockFn} style={{ backgroundColor: testColor }} />);
  });

  it("render a IconButton with size", () => {
    const mockFn = jest.fn();
    render(<IconButton name="origin" onPress={mockFn} size={16} />);
  });

  it("render a IconButton with different color", () => {
    const mockFn = jest.fn();
    const testColor = "#fff";
    render(<IconButton color={testColor} name="origin" onPress={mockFn} />);
  });

  it("render a IconButton with debounce", () => {
    const mockFn = jest.fn();
    render(<IconButton name="origin" onPress={mockFn} withDebounce={true} />);
  });

  it("render a IconButton with withHover", () => {
    const mockFn = jest.fn();
    const testColor = "#fff";
    render(<IconButton name="origin" onPress={mockFn} withHover={{ color: testColor }} />);
  });

  it("render a IconButton and check if icon is present", () => {
    const mockFn = jest.fn();
    const testColor = "#fff";
    const { getByTestId } = render(<IconButton name="origin" onPress={mockFn} withHover={{ color: testColor }} />);
    const icon = getByTestId("origin");
    expect(icon).toBeTruthy();
  });

  it("render a IconButton and press event", () => {
    const mockFn = jest.fn();
    const testColor = "#fff";
    const { getByTestId } = render(<IconButton name="origin" onPress={mockFn} withHover={{ color: testColor }} />);
    fireEvent.press(getByTestId("origin"));
    expect(mockFn).toHaveBeenCalled();
  });

  it("render a IconButton and press event 2", () => {
    const mockFn = jest.fn();
    const testColor = "#fff";
    const { getByTestId } = render(<IconButton name="origin" onPress={mockFn} testId="icon-background" withHover={{ color: testColor }} />);
    const icon = getByTestId("icon-background");
    fireEvent.press(icon);
    expect(icon.props.style.backgroundColor).toEqual(colorTransparent);
  });
});
