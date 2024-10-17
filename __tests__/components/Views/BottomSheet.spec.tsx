import { it } from "@jest/globals";
import { render } from "@testing-library/react-native";
import React from "react";

import { BottomSheet } from "../../../src/components";

it("render basic BottomSheet", () => {
  render(<BottomSheet />);
});
