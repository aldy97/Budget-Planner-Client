import React, { useState } from "react";
import Tag from "../Overview/CategoryTag";
import { List, Input, InputNumber, DatePicker } from "antd";
import { Record } from "../Overview/Content";
import moment, { Moment } from "moment";

interface MetaProps {
  item: Record;
  selected: Record;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  setRecordDate: React.Dispatch<React.SetStateAction<string>>;
}

// History内列表内容解构
function ListItemMeta({
  item,
  selected,
  setTitle,
  setDescription,
  setAmount,
  setRecordDate,
}: MetaProps) {
  return (
    <>
      <List.Item.Meta
        title={
          selected._id === item._id ? (
            <Input
              allowClear
              size="small"
              onChange={e => setTitle(e.target.value)}
              style={{ width: 100 }}
              defaultValue={item.title}
            ></Input>
          ) : (
            <div>{item.title}</div>
          )
        }
        description={
          <div>
            <Tag type={item.type} category={item.category}></Tag>
            {selected._id === item._id ? (
              <Input
                allowClear
                size="middle"
                onChange={e => setDescription(e.target.value)}
                style={{ marginTop: 5 }}
                defaultValue={item.description}
              ></Input>
            ) : (
              <div>{item.description}</div>
            )}
          </div>
        }
      />
      <div style={{ marginRight: 30, color: "#8c8c8c" }}>
        {selected._id === item._id ? (
          <InputNumber
            size="small"
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            style={{ width: 80 }}
            onChange={e => setAmount(e as number)}
            defaultValue={item.amount}
          ></InputNumber>
        ) : (
          <div>${item.amount}</div>
        )}
        <div>
          {selected._id === item._id ? (
            <DatePicker
              allowClear={false}
              onChange={(value: Moment | null, dateString: string) =>
                setRecordDate(dateString)
              }
              defaultValue={moment(item.recordDate)}
              size="small"
            ></DatePicker>
          ) : (
            item.recordDate
          )}
        </div>
      </div>
    </>
  );
}

export default ListItemMeta;
