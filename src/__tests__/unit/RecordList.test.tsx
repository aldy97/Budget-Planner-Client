import React from "react";
import { mount } from "enzyme";
import { Record } from "../../components/Overview/Content";
import RecordList from "../../components/Overview/RecordList";

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

describe("RecordList", () => {
  const wrapper = mount(
    <RecordList records={mockRecords} maxLength={5} type="expense"></RecordList>
  );

  it("renders porperly", () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it("receives correct number of records", () => {
    expect(wrapper.prop("records").length).toBe(7);
  });

  it("only renders 5 records in current year and month under given category", () => {
    const listItems = wrapper.find("li");
    expect(listItems.length).toBe(5);
    expect(listItems.at(0).find("h4").text()).toEqual("test5");
    expect(listItems.at(1).find("h4").text()).toEqual("test4");
    expect(listItems.at(2).find("h4").text()).toEqual("test3");
    expect(listItems.at(3).find("h4").text()).toEqual("test2");
    expect(listItems.at(4).find("h4").text()).toEqual("test1");
  });
});
