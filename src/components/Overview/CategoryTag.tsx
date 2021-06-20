import React from "react";
import { COLORS } from "../../utils/constants";
import { Tag } from "antd";

interface TagProps {
  category: string;
  type: "expense" | "income" | "";
}

const CategoryTag: React.FC<TagProps> = ({ category, type }) => {
  return (
    <Tag color={type === "expense" ? COLORS.ORANGE : COLORS.THEMEBLUE}>
      {category}
    </Tag>
  );
};

export default CategoryTag;
