import React from "react";
import { mount } from "enzyme";
import CategoryTag from "../../components/Overview/CategoryTag";

describe("CategoryTag", () => {
  const wrapper = mount(<CategoryTag type="expense" category="test"></CategoryTag>);

  it("can render without crashing", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("can receive its props", () => {
    expect(wrapper.prop("type")).toEqual("expense");
    expect(wrapper.prop("category")).toEqual("test");
  });
});
