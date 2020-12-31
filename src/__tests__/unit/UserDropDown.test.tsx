import React from "react";
import { mount } from "enzyme";
import UserDropDown from "../../components/UserDropDown";
import { findTestWrapper } from "../../utils/findTestWrapper";

describe("UserDropDown", () => {
  const testName = "test";
  const wrapper = mount(<UserDropDown name={testName}></UserDropDown>);

  it("renders without crashing", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("can render name properly", () => {
    const name = findTestWrapper(wrapper, "name");
    expect(name.text()).toEqual(testName);
  });
});
