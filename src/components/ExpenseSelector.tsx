import React from "react";
import { ExpenseCategories } from "../utils/constants";
import { Select } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../reducers/index";

const { Option } = Select;

interface SelectProps {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

const ExpenseSelector: React.FC<SelectProps> = ({
  setCategory,
  value,
}: SelectProps) => {
  const { expenseList } = useSelector((s: RootState) => {
    return { expenseList: s.HomeReducer.user.expenseList };
  });

  return (
    <Select
      value={value}
      style={{ width: 120 }}
      onChange={(value: string) => {
        setCategory(value);
      }}
    >
      {(expenseList || ExpenseCategories).map((category, index) => {
        return (
          <Option key={index} value={category}>
            {category}
          </Option>
        );
      })}
    </Select>
  );
};

export default ExpenseSelector;
