import React from 'react';
import { mount } from 'enzyme';
import Progress from '../../components/Account/Progress';
import { findTestWrapper } from '../../utils/findTestWrapper';

describe("Progress bar", () => {
    let wrapper: any;
    const fn = jest.fn();
    

    beforeEach(() => {
        wrapper = mount(<Progress threshold = {30} changeThreshold = {fn}></Progress>);
    })

    it("renders without crashing", () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper).toMatchSnapshot();
    })

    it("receives props threshold", () => {
        expect(wrapper.prop("threshold")).toBe(30);
    })

    it("triggers threshold change after button is clicked", () => {
        expect(fn).toHaveBeenCalledTimes(0);
        const buttons = wrapper.find("button");
        expect(buttons.length).toBe(2);
        buttons.at(0).simulate("click");
        expect(fn).toHaveBeenCalledTimes(1);
        buttons.at(1).simulate("click");
        expect(fn).toHaveBeenCalledTimes(2);
    })

    it("the bar renders received threshold", () => {
        const bar = findTestWrapper(wrapper, "bar").at(1);
        expect(bar.find("span").text()).toEqual("30%");
    })
})
