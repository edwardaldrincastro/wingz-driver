import { it } from "@jest/globals";
import { render } from "@testing-library/react-native";
import React from "react";

import { LocalAssets } from "../../../src/assets/images/LocalAssets";
import { Pager } from "../../../src/components";

it("render basic BottomSheet", () => {
  render(<Pager data={[{ title: "test", subtitle: "test", image: LocalAssets.illustration.onboarding1 }]} />);
});
