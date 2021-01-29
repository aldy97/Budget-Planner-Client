import React from "react";
import { mount } from "enzyme";
import TitleInput from "../../components/TitleInput";
import { findTestWrapper } from "../../utils/findTestWrapper";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { UPDATE_TITLE, UpdateTitle } from "../../actions/ModalAction";

const mockStore = configureStore([]);

describe("TitleInput", () => {
  let store;
  let wrapper;
  let inputField;
  const content = "test";

  beforeEach(() => {
    store = mockStore({
      ModalReducer: { title: content },
    });

    store.dispatch = jest.fn();

    wrapper = mount(
      <Provider store={store}>
        <TitleInput></TitleInput>
      </Provider>
    );

    inputField = findTestWrapper(wrapper, "input").at(0);
  });

  it("can be rendered", () => {
    expect(wrapper.length).toBe(1);
  });

  it("shows proper placeholder", () => {
    expect(inputField.prop("placeholder")).toEqual("Title (optional)");
  });

  it("renders title received from the store", () => {
    expect(inputField.prop("defaultValue")).toEqual(content);
  });

  it("dispatches when input value changes", () => {
    const input = wrapper.find("input");
    expect(store.dispatch).toHaveBeenCalledTimes(0);
    input.simulate("change", { value: "test" });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    input.simulate("change", { value: "test1" });
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });

  it("can dispatch action to the reducer", () => {
    const action: UpdateTitle = {
      type: UPDATE_TITLE,
      title: "test",
    };
    store.dispatch(action);
    expect(store.getActions()).toMatchSnapshot();
  });
});
