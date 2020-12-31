import React from "react";
import { COLORS } from "../../utils/constants";
import { Tag } from "antd";

interface TagProps {
  category: string;
  type: string;
}

function CategoryTag({ category, type }: TagProps): JSX.Element {
  return (
    <Tag color={type === "expense" ? COLORS.ORANGE : COLORS.THEMEBLUE}>
      {category}
    </Tag>
  );
}

export default CategoryTag;
