import React from "react";
import Tag from "../Overview/CategoryTag";
import { List, Input, InputNumber, DatePicker } from "antd";
import { Record } from "../Overview/Content";
import moment from "moment";
import {
  EDIT_TITLE,
  EditTitle,
  EditDescription,
  EDIT_DESCRIPTION,
  EditAmount,
  EDIT_AMOUNT,
  EDIT_RECORD_DATE,
  EditRecordDate,
} from "../../actions/EditModallAction";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../reducers/index";

interface MetaProps {
  item: Record;
  recordID?: string;
  updateTitle?: any;
  updateDesc?: any;
  updateAmount?: any;
  updateDate?: any;
}

// History内列表内容解构
function ListItemMeta({
  item,
  recordID,
  updateTitle,
  updateDesc,
  updateAmount,
  updateDate,
}: MetaProps) {
  const handleTitleChange = (e: any) => {
    updateTitle(e.target.value);
  };

  const handleDescChange = (e: any) => {
    updateDesc(e.target.value);
  };

  const handleAmountChange = (value: any) => {
    updateAmount(value);
  };

  const handleDateChange = (date: any, dateString: string) => {
    updateDate(dateString);
  };

  return (
    <>
      <List.Item.Meta
        title={
          recordID === item._id ? (
            <Input
              allowClear
              onChange={handleTitleChange}
              size="small"
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
            {recordID === item._id ? (
              <Input
                allowClear
                onChange={handleDescChange}
                size="middle"
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
        {recordID === item._id ? (
          <InputNumber
            size="small"
            onChange={handleAmountChange}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            style={{ width: 80 }}
            defaultValue={item.amount}
          ></InputNumber>
        ) : (
          <div>${item.amount}</div>
        )}
        <div>
          {recordID === item._id ? (
            <DatePicker
              onChange={handleDateChange}
              allowClear={false}
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

const mapState = (state: RootState) => {
  return {
    recordID: state.EditModalReducer.recordID,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    updateTitle(title: string) {
      const action: EditTitle = {
        type: EDIT_TITLE,
        title,
      };
      dispatch(action);
    },
    updateDesc(description: string) {
      const action: EditDescription = {
        type: EDIT_DESCRIPTION,
        description,
      };
      dispatch(action);
    },
    updateAmount(amount: number) {
      const action: EditAmount = {
        type: EDIT_AMOUNT,
        amount,
      };
      dispatch(action);
    },
    updateDate(date: string) {
      const action: EditRecordDate = {
        type: EDIT_RECORD_DATE,
        date,
      };
      dispatch(action);
    },
  };
};

export default connect(mapState, mapDispatch)(ListItemMeta);
