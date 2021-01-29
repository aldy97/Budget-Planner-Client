import React from "react";
import { shallow, mount } from "enzyme";
import RecordList from "../../components/History/RecordList";
import { Record } from "../../components/Overview/Content";
import { Provider } from "react-redux";
import { EditModalReducerProps } from "../../reducers/EditModalReducer";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const mockRecords: Record[] = [
  {
    title: "test1",
    description: "No description",
    createdOn: "2021-01-01T00:00:00.000Z",
    updatedOn: "2021-01-01T00:00:00.000Z",
    _id: "5fef5ab6f90ada2dfaa37482",
    type: "expense",
    category: "Meals",
    amount: 20,
    recordDate: "2021-01-01",
  },
  {
    title: "test2",
    description: "No description",
    createdOn: "2021-01-01T00:00:00.000Z",
    updatedOn: "2021-01-01T00:00:00.000Z",
    _id: "5fef5ab6f90ada2dfaa37482",
    type: "expense",
    category: "Meals",
    amount: 20,
    recordDate: "2021-01-01",
  },
  {
    title: "test3",
    description: "No description",
    createdOn: "2021-01-01T00:00:00.000Z",
    updatedOn: "2021-01-01T00:00:00.000Z",
    _id: "5fef5ab6f90ada2dfaa37482",
    type: "expense",
    category: "Meals",
    amount: 20,
    recordDate: "2021-01-01",
  },
  {
    title: "test4",
    description: "No description",
    createdOn: "2021-01-01T00:00:00.000Z",
    updatedOn: "2021-01-01T00:00:00.000Z",
    _id: "5fef5ab6f90ada2dfaa37482",
    type: "expense",
    category: "Meals",
    amount: 20,
    recordDate: "2021-01-01",
  },
  {
    title: "test5",
    description: "No description",
    createdOn: "2021-01-01T00:00:00.000Z",
    updatedOn: "2021-01-01T00:00:00.000Z",
    _id: "5fef5ab6f90ada2dfaa37482",
    type: "expense",
    category: "Meals",
    amount: 20,
    recordDate: "2021-01-01",
  },
  {
    title: "test6",
    description: "No description",
    createdOn: "2020-01-01T00:00:00.000Z",
    updatedOn: "2020-01-01T00:00:00.000Z",
    _id: "5fef5ab6f90ada2dfaa37482",
    type: "expense",
    category: "Meals",
    amount: 20,
    recordDate: "2019-01-01",
  },
  {
    title: "test7",
    description: "No description",
    createdOn: "2021-01-01T00:00:00.000Z",
    updatedOn: "2021-01-01T00:00:00.000Z",
    _id: "5fef5ab6f90ada2dfaa37482",
    type: "income",
    category: "investment",
    amount: 20,
    recordDate: "2019-01-01",
  },
];

describe("RecordList in History", () => {
  const initialState: EditModalReducerProps = {
    recordID: "",
    title: "",
    date: "",
    recordType: "",
    category: "",
    amount: 0,
    description: "",
  };

  it("renders without crshing", () => {
    const store = mockStore({
      HomeReducer: { records: mockRecords },
      FilterReducer: { enabled: false, month: "2021-01", category: "meal" },
      EditModalReducer: initialState,
    });

    const wrapper = shallow(
      <Provider store={store}>
        <RecordList></RecordList>
      </Provider>
    );

    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders all records when filter is disabled even though month filter and category filter is activated", () => {
    const store = mockStore({
      HomeReducer: { records: mockRecords },
      FilterReducer: { enabled: false, month: "2021-01", category: "" },
      EditModalReducer: initialState,
    });

    const wrapper = mount(
      <Provider store={store}>
        <RecordList></RecordList>
      </Provider>
    );

    const listItems = wrapper.find(".ant-list-item");
    expect(listItems.length).toBe(7);
  });

  it("renders all records when filter is enabled but not specified", () => {
    const store = mockStore({
      HomeReducer: { records: mockRecords },
      FilterReducer: { enabled: true, month: "", category: "" },
      EditModalReducer: initialState,
    });

    const wrapper = mount(
      <Provider store={store}>
        <RecordList></RecordList>
      </Provider>
    );

    const listItems = wrapper.find(".ant-list-item");
    expect(listItems.length).toBe(7);
  });

  it("renders records that match with the matching time when it is enabled", () => {
    const store = mockStore({
      HomeReducer: { records: mockRecords },
      FilterReducer: { enabled: true, month: "2021-01", category: "" },
      EditModalReducer: initialState,
    });

    const wrapper = mount(
      <Provider store={store}>
        <RecordList></RecordList>
      </Provider>
    );

    const listItems = wrapper.find(".ant-list-item");
    expect(listItems.length).toBe(5);
  });

  it("renders records that match with the matching category when it is enabled", () => {
    const store = mockStore({
      HomeReducer: { records: mockRecords },
      FilterReducer: { enabled: true, month: "", category: "investment" },
      EditModalReducer: initialState,
    });

    const wrapper = mount(
      <Provider store={store}>
        <RecordList></RecordList>
      </Provider>
    );

    const listItems = wrapper.find(".ant-list-item");
    expect(listItems.length).toBe(1);
  });

  it("does not render any record if none of them matches with filter when it is enabled", () => {
    const store = mockStore({
      HomeReducer: { records: mockRecords },
      FilterReducer: { enabled: true, month: "2000-01-11", category: "investment" },
      EditModalReducer: initialState,
    });

    const wrapper = mount(
      <Provider store={store}>
        <RecordList></RecordList>
      </Provider>
    );

    const listItems = wrapper.find(".ant-list-item");
    expect(listItems.length).toBe(0);
  });
});
