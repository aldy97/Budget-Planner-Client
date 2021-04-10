import React, { useState } from "react";
import { List, Button } from "antd";

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

  const styles: { [styles: string]: React.CSSProperties } = {
    butonStyle: {
      float: "right",
      marginRight: 8,
    },
  };

  return (
    <List.Item
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {itemName}
      {isHovered && (
        <>
          <Button
            onClick={() => {
              onDelClick(itemName);
            }}
            type="primary"
            danger
            size="small"
            style={styles.butonStyle}
          >
            Delete
          </Button>

          {!isLast && (
            <Button
              onClick={() => {
                onArrowDown(index);
              }}
              type="primary"
              size="small"
              style={styles.butonStyle}
            >
              Move down
            </Button>
          )}

          {!isFirst && (
            <Button
              onClick={() => {
                onArrowUp(index);
              }}
              type="primary"
              size="small"
              style={styles.butonStyle}
            >
              Move up
            </Button>
          )}
        </>
      )}
    </List.Item>
  );
};

export default ListItem;
