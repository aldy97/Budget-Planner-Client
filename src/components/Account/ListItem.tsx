import React, { useState } from "react";
import { List } from "antd";
import {
  DeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { COLORS } from "../../utils/constants";

type ListItemProps = {
  index: number;
  isFirst: boolean;
  isLast: boolean;
  itemName: string;
  onDelClick: (word: string) => void;
  onArrowUp: (index: number) => void;
  onArrowDown: (index: number) => void;
};

const ListItem: React.FC<ListItemProps> = (props: ListItemProps) => {
  const {
    itemName,
    onDelClick,
    isFirst,
    isLast,
    onArrowUp,
    onArrowDown,
    index,
  } = props;
  const [isHovered, setIsHovered] = useState(false);

  const toggle = (): void => {
    setIsHovered(!isHovered);
  };

  const styles: { [styles: string]: React.CSSProperties } = {
    iconStyle: {
      float: "right",
      marginRight: 8,
      marginTop: 4,
      color: "red",
      cursor: "pointer",
    },
  };

  return (
    <List.Item onMouseEnter={toggle} onMouseLeave={toggle}>
      {itemName}
      {isHovered && (
        <>
          <DeleteOutlined
            onClick={() => {
              onDelClick(itemName);
            }}
            style={{ ...styles.iconStyle, color: "red" }}
          />

          {!isLast && (
            <ArrowDownOutlined
              onClick={() => {
                onArrowDown(index);
              }}
              style={{ ...styles.iconStyle, color: COLORS.THEMEBLUE }}
            ></ArrowDownOutlined>
          )}

          {!isFirst && (
            <ArrowUpOutlined
              onClick={() => {
                onArrowUp(index);
              }}
              style={{ ...styles.iconStyle, color: COLORS.THEMEBLUE }}
            ></ArrowUpOutlined>
          )}
        </>
      )}
    </List.Item>
  );
};

export default ListItem;
