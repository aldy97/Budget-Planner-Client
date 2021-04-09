import React, { useState } from "react";
import { List } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

type ListItemProps = {
  itemName: string;
  onDelClick: (word: string) => void;
};

const ListItem: React.FC<ListItemProps> = (props: ListItemProps) => {
  const { itemName, onDelClick } = props;
  const [isHovered, setIsHovered] = useState(false);
  const toggle = () => {
    setIsHovered(!isHovered);
  };
  return (
    <List.Item onMouseEnter={toggle} onMouseLeave={toggle}>
      {itemName}
      {isHovered && (
        <DeleteOutlined
          onClick={() => {
            onDelClick(itemName);
          }}
          style={{
            float: "right",
            marginRight: 8,
            marginTop: 4,
            color: "red",
            cursor: "pointer",
          }}
        />
      )}
    </List.Item>
  );
};

export default ListItem;
