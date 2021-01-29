import React from "react";
import { mount } from "enzyme";
import Content from "../../components/Account/Content";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Account Content", () => {
  let wrapper;
  const name = "Feng Xiong";
  const email = "fengxiong34@gmail.com";
  const store = mockStore({
    HomeReducer: {
      name,
      email,
      id: "001",
    },
    AccountReducer: {
      budget: 1000,
      threshold: 30,
    },
  });

  store.dispatch = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Content></Content>
      </Provider>
    );
  });

  it("renders without crashing", () => {
    expect(wrapper.length).toBe(1);
  });

  it("renders name received from reducer", () => {
    const inputName = wrapper.find("input").at(0);
    expect(inputName.prop("value")).toEqual(name);
  });

  it("renders email received from reducer", () => {
    const inputEmail = wrapper.find("input").at(1);
    expect(inputEmail.prop("value")).toEqual(email);
  });

  it("renders budget received from reducer", () => {
    const budget = wrapper.find("input").at(2);
    expect(budget.prop("value")).toEqual(1000);
  });

  it("renders threshold received from reducer", () => {
    const threshold = wrapper.find(".ant-progress-text");
    expect(threshold.prop("title")).toEqual("30%");
  });

  it("renders three buttons: minus, plus and confirm", () => {
    const buttons = wrapper.find("button");
    const confirm = buttons.at(2);
    expect(buttons.length).toBe(3);
    expect(confirm.find("span").text()).toEqual("Confirm");
  });

  it("threshold value should be decremented by 10 after minus is clickde", () => {
    const buttons = wrapper.find("button");
    const minus = buttons.at(0);
    minus.simulate("click");
    const threshold = wrapper.find(".ant-progress-text");
    expect(threshold.prop("title")).toEqual("20%");
  });

  it("threshold value should be incremented by 10 after minus is clickde", () => {
    const buttons = wrapper.find("button");
    const plus = buttons.at(1);
    plus.simulate("click");
    const threshold = wrapper.find(".ant-progress-text");
    expect(threshold.prop("title")).toEqual("40%");
  });
});
