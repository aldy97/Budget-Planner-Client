import React from "react";
import { Switch, Space, Select, DatePicker } from "antd";
import { ExpenseCategories, IncomeCategories } from "../../utils/constants";
import {
  TOGGLEFILTER,
  ToggleFilter,
  CHOOSEMONTH,
  ChooseMonth,
  ChooseCategory,
  CHOOSECATEGORY,
} from "../../actions/FilterAction";
import moment from "moment";
import { connect } from "react-redux";
import { RootState } from "../../reducers/index";
import { Dispatch } from "redux";

const { Option, OptGroup } = Select;

interface FilterProps {
  enabled: boolean;
  month: string;
  category: string;
  toggleSwitch: any;
  updateMonthToRedux: any;
  updateCategoryToRedux: any;
}

function Filter({
  enabled,
  month,
  category,
  toggleSwitch,
  updateMonthToRedux,
  updateCategoryToRedux,
}: FilterProps) {
  const handleSwitchChange = () => {
    toggleSwitch(!enabled);
  };

  const handleMonthChange = (date: any, dateString: string) => {
    updateMonthToRedux(dateString);
  };

  const handleCategoryChange = (value: string) => {
    updateCategoryToRedux(value);
  };

  return (
    <Space>
      <span>Apply Filter:</span>
      <Switch checked={enabled} onChange={handleSwitchChange}></Switch>
      <DatePicker
        allowClear
        defaultValue={month === "" ? undefined : moment(month)}
        disabled={!enabled}
        onChange={handleMonthChange}
        picker="month"
      />
      <span>Choose category:</span>
      <Select
        allowClear
        defaultValue={category}
        disabled={!enabled}
        style={{ width: 200 }}
        onChange={handleCategoryChange}
      >
        <OptGroup label="Expense">
          {ExpenseCategories.map((category, index) => {
            return (
              <Option key={index} value={category}>
                {category}
              </Option>
            );
          })}
        </OptGroup>
        <OptGroup label="Income">
          {IncomeCategories.map((category, index) => {
            return (
              <Option key={index} value={category}>
                {category}
              </Option>
            );
          })}
        </OptGroup>
      </Select>
    </Space>
  );
}

const mapState = (state: RootState) => {
  return {
    enabled: state.FilterReducer.enabled,
    month: state.FilterReducer.month,
    category: state.FilterReducer.category,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    toggleSwitch(enabled: boolean) {
      const action: ToggleFilter = {
        type: TOGGLEFILTER,
        enabled,
      };
      dispatch(action);
    },
    updateMonthToRedux(month: string) {
      const action: ChooseMonth = {
        type: CHOOSEMONTH,
        month,
      };
      dispatch(action);
    },
    updateCategoryToRedux(category: string) {
      const action: ChooseCategory = {
        type: CHOOSECATEGORY,
        category,
      };
      dispatch(action);
    },
  };
};

export default connect(mapState, mapDispatch)(Filter);
