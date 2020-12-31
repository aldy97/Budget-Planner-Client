import React from "react";
import { mount } from "enzyme";
import TypeInput from "../../components/TypeInput";
import { findTestWrapper } from "../../utils/findTestWrapper";
import { Provider } from "react-redux";
import { store } from "../../App";

describe("TypeInput", () => {
  const wrapper = mount(
    <Provider store={store}>
      <TypeInput></TypeInput>
    </Provider>
  );

  it("renders without crahsing", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("has expense box checked and income box unchecked as default", () => {
    const expenseBox = findTestWrapper(wrapper, "expense");
    const incomeBox = findTestWrapper(wrapper, "income");
    expect(expenseBox.at(0).prop("checked")).toBeTruthy;
    expect(incomeBox.at(0).prop("checked")).not.toBeTruthy;
  });

  it("after expense is clicked, it becomes unchecked and income is now checked", () => {
    const expenseBox = findTestWrapper(wrapper, "expense");
    const incomeBox = findTestWrapper(wrapper, "income");
    expenseBox.at(0).simulate("click");
    expect(expenseBox.at(0).prop("checked")).toBeFalsy;
    expect(incomeBox.at(0).prop("checked")).toBeTruthy;
  });
});
