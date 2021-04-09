import React from "react";
import { ExpenseCategories, IncomeCategories } from "../utils/constants";
import { Select } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../reducers/index";

const { Option } = Select;

interface SelectProps {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  type: "expense" | "income";
}

const CategorySelector: React.FC<SelectProps> = ({
  setCategory,
  value,
  type,
}: SelectProps) => {
  const { expenseList, incomeList } = useSelector((s: RootState) => {
    return {
      expenseList: s.HomeReducer.user.expenseList,
      incomeList: s.HomeReducer.user.incomeList,
    };
  });

  const list =
    type === "expense"
      ? expenseList || ExpenseCategories
      : incomeList || IncomeCategories;

  return (
    <Select
      value={value}
      style={{ width: 120 }}
      onChange={(value: string) => {
        setCategory(value);
      }}
    >
      {list.map((category, index) => {
        return (
          <Option key={index} value={category}>
            {category}
          </Option>
        );
      })}
    </Select>
  );
};

export default CategorySelector;
