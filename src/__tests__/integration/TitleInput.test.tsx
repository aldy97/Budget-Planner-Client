import React from "react";
import { mount } from "enzyme";
import TitleInput from "../../components/TitleInput";
import { findTestWrapper } from "../../utils/findTestWrapper";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

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

    wrapper = mount(
      <Provider store={store}>
        <TitleInput></TitleInput>
      </Provider>
    );

    inputField = findTestWrapper(wrapper, "input");
  });

  it("can be rendered", () => {
    expect(wrapper.length).toBe(1);
  });

  it("shows proper placeholder", () => {
    expect(inputField.at(0).prop("placeholder")).toEqual("Title (optional)");
  });

  it("renders title received from the store", () => {
    expect(inputField.at(0).prop("defaultValue")).toEqual(content);
  });
});
