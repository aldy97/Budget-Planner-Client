import React from "react";
import Tag from "./CategoryTag";
import { Record } from "./Content";
import { List, Skeleton } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/index";

interface ListProps {
  type: "expense" | "income";
  records: Record[];
  maxLength: number;
}

const RecordList: React.FC<ListProps> = ({
  type,
  records,
  maxLength,
}: ListProps) => {
  // 根据记录类型，展示当年当月指定数量的记录
  const data = records
    .filter(
      record => record.type === type && moment().isSame(record.recordDate, "month")
    )
    .sort((a, b) => {
      if (moment(a.recordDate).isBefore(b.recordDate)) {
        return 1;
      } else if (moment(b.recordDate).isBefore(a.recordDate)) {
        return -1;
      } else {
        return a.amount > b.amount ? 1 : -1;
      }
    })
    .slice(0, maxLength);

  const { loaded } = useSelector((s: RootState) => {
    return { loaded: s.HomeReducer.loaded };
  });

  return (
    <>
      {loaded ? (
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
      ) : (
        <List
          style={{ flex: 1, marginLeft: 30, marginRight: 30 }}
          itemLayout="horizontal"
          dataSource={type === "expense" ? [1, 2, 3, 4] : [1, 2, 3]}
          renderItem={item => <Skeleton></Skeleton>}
        ></List>
      )}
    </>
  );
  // return <Skeleton active></Skeleton>;
};

export default RecordList;
