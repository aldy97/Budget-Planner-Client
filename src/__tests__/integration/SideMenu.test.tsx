import React from "react";
import { mount } from "enzyme";
import SideMenu from "../../components/SideMenu";
import { findTestWrapper } from "../../utils/findTestWrapper";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("SideMenu", () => {
  let store;
  let wrapper;
  const selected = 0;
  let menuitems;

  beforeEach(() => {
    store = mockStore({});
    wrapper = mount(
      <Provider store={store}>
        <SideMenu selected={selected}></SideMenu>
      </Provider>
    );
    menuitems = wrapper.find("li");
  });

  it("renders four menu items", () => {
    expect(menuitems.length).toBe(4);
    expect(menuitems.at(0).text()).toEqual("Overview");
    expect(menuitems.at(1).text()).toEqual("Diagram");
    expect(menuitems.at(2).text()).toEqual("History");
    expect(menuitems.at(3).text()).toEqual("My Account");
  });

  it("highlights default selected menu item", () => {
    const menu = findTestWrapper(wrapper, "menu");
    expect(menu.at(0).prop("defaultSelectedKeys")).toEqual([`${selected}`]);
  });
});
