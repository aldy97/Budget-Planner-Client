import React from "react";
import { mount } from "enzyme";
import AmountInput from "../../components/AmountInput";
import { findTestWrapper } from "../../utils/findTestWrapper";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { UPDATE_AMOUNT, UpdateAmount } from "../../actions/ModalAction";

const mockStore = configureStore([]);

describe("Amount Input", () => {
  let store;
  let wrapper;
  let input;

  beforeEach(() => {
    store = mockStore({ ModalReducer: { amount: 200 } });

    store.dispatch = jest.fn();

    wrapper = mount(
      <Provider store={store}>
        <AmountInput></AmountInput>
      </Provider>
    );

    input = findTestWrapper(wrapper, "input").at(0);
  });

  it("renders without crashing", () => {
    expect(wrapper.length).toBe(1);
  });

  it("default value is 0", () => {
    expect(input.prop("defaultValue")).toBe(0);
  });

  it("renders default value", () => {
    const input = wrapper.find("input");
    expect(input.length).toBe(1);
    expect(input.prop("value")).toEqual("$ 0");
  });

  it("dispatches when amount value changes", () => {
    const input = wrapper.find("input");
    expect(store.dispatch).toHaveBeenCalledTimes(0);
    input.simulate("change", { value: 200 });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    input.simulate("change", { value: 201 });
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });

  it("can dispatch action to the reducer", () => {
    const action: UpdateAmount = {
      type: UPDATE_AMOUNT,
      amount: 100,
    };
    store.dispatch(action);
    expect(store.getActions()).toMatchSnapshot();
  });
});
