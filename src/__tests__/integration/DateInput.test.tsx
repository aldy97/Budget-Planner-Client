import React from "react";
import { mount } from "enzyme";
import DateInput from "../../components/RecordDateInput";
import { findTestWrapper } from "../../utils/findTestWrapper";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import moment from "moment";

const mockStore = configureStore([]);

describe("DateInput", () => {
  let store;
  let wrapper;
  let dataInput;

  const today = moment().format("YYYY-MM-DD");

  beforeEach(() => {
    store = mockStore({
      ModalReducer: { recordDate: today },
    });

    wrapper = mount(
      <Provider store={store}>
        <DateInput></DateInput>
      </Provider>
    );

    dataInput = findTestWrapper(wrapper, "date");
  });

  it("renders without crashing", () => {
    expect(wrapper.length).toBe(1);
  });

  it("renders today's date as default, which is received from the store", () => {
    const dateRendered = dataInput.at(0).prop("defaultValue");
    expect(moment(dateRendered).format("YYYY-MM-DD")).toEqual(today);
  });
});
