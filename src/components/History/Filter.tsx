import React, { useState, useEffect } from "react";
import { Switch, Space, Select, DatePicker } from "antd";
import { ExpenseCategories, IncomeCategories } from "../../utils/constants";
import { UPDATE_FILTER, UpdateFilter } from "../../actions/FilterAction";
import moment from "moment";
import styled from "styled-components";
import { connect } from "react-redux";
import { RootState } from "../../reducers/index";
import { Dispatch } from "redux";
import { Filter } from "../../reducers/FilterReducer";
import useWidth from "../../utils/useWidth";
import { useSelector } from "react-redux";

const { Option, OptGroup } = Select;

interface FilterProps {
  updateFilter: (filter: Filter) => void;
}

const StyledSpan = styled.span`
  color: #595959;
  font-size: 16px;
  font-weight: bold;
`;

const RecordsFilter: React.FC<FilterProps> = ({ updateFilter }) => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [month, setMonth] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const width = useWidth();

  const { expenseList, incomeList } = useSelector((s: RootState) => {
    return {
      expenseList: s.HomeReducer.user.expenseList,
      incomeList: s.HomeReducer.user.incomeList,
    };
  });

  const handleSwitchChange = () => {
    setEnabled(!enabled);
    const filter: Filter = { enabled, month, category };
    updateFilter(filter);
  };

  const handleMonthChange = (value: moment.Moment | null, dateString: string) => {
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
    <Space direction={width > 1000 ? "horizontal" : "vertical"}>
      <StyledSpan>Apply Filter:</StyledSpan>
      <Switch checked={enabled} onChange={handleSwitchChange}></Switch>
      <DatePicker
        allowClear
        defaultValue={month === "" ? undefined : moment(month)}
        disabled={!enabled}
        onChange={handleMonthChange}
        picker="month"
      />
      <StyledSpan>Choose category:</StyledSpan>
      <Select
        allowClear
        defaultValue={category}
        disabled={!enabled}
        style={{ width: 200 }}
        onChange={handleCategoryChange}
      >
        <OptGroup label="Expense">
          {(expenseList && expenseList.length > 0
            ? expenseList
            : ExpenseCategories
          ).map((category, index) => {
            return (
              <Option key={index} value={category}>
                {category}
              </Option>
            );
          })}
        </OptGroup>
        <OptGroup label="Income">
          {(incomeList && incomeList.length > 0 ? incomeList : IncomeCategories).map(
            (category, index) => {
              return (
                <Option key={index} value={category}>
                  {category}
                </Option>
              );
            }
          )}
        </OptGroup>
      </Select>
    </Space>
  );
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

export default connect(null, mapDispatch)(RecordsFilter);
