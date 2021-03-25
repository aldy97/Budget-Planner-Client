import React from "react";
import { IncomeCategories } from "../utils/constants";
import { Select } from "antd";

const { Option } = Select;

interface SelectProps {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

const IncomeSelector: React.FC<SelectProps> = ({
  setCategory,
  value,
}: SelectProps) => {
  const handleCategoryChange = (value: string): void => {
    setCategory(value);
  };

  return (
    <Select value={value} style={{ width: 120 }} onChange={handleCategoryChange}>
      {IncomeCategories.map((category, index) => {
        return (
          <Option key={index} value={category}>
            {category}
          </Option>
        );
      })}
    </Select>
  );
};

export default IncomeSelector;
