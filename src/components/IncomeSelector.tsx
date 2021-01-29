import React from "react";
import { IncomeCategories } from "../utils/constants";
import { Select } from "antd";

const { Option } = Select;

interface SelectProps {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

function IncomeSelector({ setCategory }: SelectProps) {
  const handleCategoryChange = (value: any): void => {
    setCategory(value);
  };

  return (
    <Select
      placeholder="Categories"
      style={{ width: 120 }}
      onChange={handleCategoryChange}
    >
      {IncomeCategories.map((category, index) => {
        return (
          <Option key={index} value={category}>
            {category}
          </Option>
        );
      })}
    </Select>
  );
}

export default IncomeSelector;
