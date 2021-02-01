import React from "react";
import Tag from "./CategoryTag";
import { Record } from "./Content";
import { List } from "antd";
import moment from "moment";

interface ListProps {
  type: "expense" | "income";
  records: Record[];
  maxLength: number;
}

function RecordList({ type, records, maxLength }: ListProps): JSX.Element {
  // 根据记录类型，展示当年当月指定数量的记录
  const data = records
    .filter(
      record => record.type === type && moment().isSame(record.recordDate, "month")
    )
    .sort((a, b) => {
      return moment(a.recordDate).isBefore(moment(b.recordDate)) ? 1 : -1;
    })
    .slice(0, maxLength);

  return (
    <>
      <List
        style={{ flex: 1, marginLeft: 30, marginRight: 30 }}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item data-test="list-item">
            <List.Item.Meta
              title={item.title}
              description={
                <div>
                  <Tag type={item.type} category={item.category}></Tag>
                  <div>{item.description}</div>
                </div>
              }
            />
            <div style={{ marginRight: 30, color: "#8c8c8c" }}>${item.amount}</div>
          </List.Item>
        )}
      />
    </>
  );
}

export default RecordList;
