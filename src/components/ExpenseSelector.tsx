import React from "react";
import { ExpenseCategories } from "../utils/constants";
import { Select } from "antd";
import { UPDATE_CATEGORY, UpdateCategory } from "../actions/ModalAction";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const { Option } = Select;

interface SelectProps {
  updateCategoryToRedux: (cat: string) => void;
}

function ExpenseSelector({ updateCategoryToRedux }: SelectProps) {
  const handleCategoryChange = (value: any): void => {
    updateCategoryToRedux(value);
  };

  return (
    <Select
      placeholder="Categories"
      style={{ width: 120 }}
      onChange={handleCategoryChange}
    >
      {ExpenseCategories.map((category, index) => {
        return (
          <Option key={index} value={category}>
            {category}
          </Option>
        );
      })}
    </Select>
  );
}

const mapDispatch = (dispatch: Dispatch) => {
  return {
    updateCategoryToRedux(category: string) {
      const action: UpdateCategory = {
        type: UPDATE_CATEGORY,
        category,
      };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatch)(ExpenseSelector);
