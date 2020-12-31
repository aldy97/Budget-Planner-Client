import React from "react";
import { mount } from "enzyme";
import SummaryBox from "../../components/Overview/SummaryBox";
import { findTestWrapper } from "../../utils/findTestWrapper";

describe("SummaryBox", () => {
  const wrapper = mount(<SummaryBox type="expense" amount={12}></SummaryBox>);

  it("can render without crashing", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("can render whether it is expense or income box", () => {
    const type = findTestWrapper(wrapper, "type");
    const amount = findTestWrapper(wrapper, "amount");
    expect(type.text()).toEqual("Monthly Expense:");
    expect(amount.text()).toEqual("$12");
  });
});
