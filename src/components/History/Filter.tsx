import React, { useState, useEffect } from "react";
import { Switch, Space, Select, DatePicker } from "antd";
import { ExpenseCategories, IncomeCategories } from "../../utils/constants";
import { UPDATE_FILTER, UpdateFilter } from "../../actions/FilterAction";
import moment from "moment";
import { connect } from "react-redux";
import { RootState } from "../../reducers/index";
import { Dispatch } from "redux";
import { Filter } from "../../reducers/FilterReducer";

const { Option, OptGroup } = Select;

interface FilterProps {
  filter: Filter;
  updateFilter: (filter: Filter) => void;
}

function RecordsFilter({ filter, updateFilter }: FilterProps) {
  const [enabled, setEnabled] = useState(false);
  const [month, setMonth] = useState("");
  const [category, setCategory] = useState("");

  const handleSwitchChange = () => {
    setEnabled(!enabled);
    const filter: Filter = { enabled, month, category };
    updateFilter(filter);
  };

  const handleMonthChange = (date: any, dateString: string) => {
    setMonth(dateString);
    const filter: Filter = { enabled, month, category };
    updateFilter(filter);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  useEffect(() => {
    const filter: Filter = { enabled, month, category };
    updateFilter(filter);
  }, [enabled, month, category]);

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
    filter: state.FilterReducer.filter,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    updateFilter(filter: Filter) {
      const action: UpdateFilter = {
        type: UPDATE_FILTER,
        filter,
      };
      dispatch(action);
    },
  };
};

export default connect(mapState, mapDispatch)(RecordsFilter);
