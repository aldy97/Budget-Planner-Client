import React, { useState, useEffect } from "react";
import ListItemMeta from "./ListItemMeta";
import { COLORS } from "../../utils/constants";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Record } from "../Overview/Content";
import axios from "axios";
import { List, message, Popconfirm, Button } from "antd";
import { UpdateRecords, UPDATE_RECORDS } from "../../actions/HomeAction";
import {
  UPDATE_RECORD_ID,
  UpdateRecordID,
  EDIT_TITLE,
  EditTitle,
  EditDescription,
  EDIT_DESCRIPTION,
  EditAmount,
  EDIT_AMOUNT,
  EditRecordDate,
  EDIT_RECORD_DATE,
} from "../../actions/EditModallAction";
import { connect } from "react-redux";
import { RootState } from "../../reducers/index";
import { Dispatch } from "redux";

interface List {
  records?: Record[];
  recordID?: string;
  enabled?: boolean;
  month?: string;
  category?: string;
  updateRecordsToRedux?: any;
  updateRecordIDToRedux?: any;
  updateTitleToRedux?: any;
  updateDescToRedux?: any;
  updateAmountToRedux?: any;
  updateDateToRedux?: any;
  user?: any;
  recordTitle?: string;
  amount?: number;
  recordDate?: string;
  description?: string;
}

function RecordList({
  records,
  recordID,
  enabled,
  month,
  category,
  updateRecordsToRedux,
  updateRecordIDToRedux,
  updateTitleToRedux,
  updateDescToRedux,
  updateAmountToRedux,
  updateDateToRedux,
  user,
  recordTitle,
  amount,
  recordDate,
  description,
}: List) {
  const [data, setData] = useState<Record[]>([]);

  const generateRecords = (): void => {
    let modifiedRecord: Record[] = [];
    if (!enabled) {
      modifiedRecord = records ? records : [];
    } else {
      if (month && category && month !== "" && category !== "") {
        modifiedRecord = records
          ? records.filter(
              record =>
                record.category === category &&
                record.recordDate.slice(0, 7) === month
            )
          : [];
      } else if (!month && !category) {
        modifiedRecord = records ? records : [];
      } else if (month && month !== "") {
        modifiedRecord = records
          ? records.filter(record => record.recordDate.slice(0, 7) === month)
          : [];
      } else {
        modifiedRecord = records
          ? records.filter(record => record.category === category)
          : [];
      }
    }
    // caution: update state only at the top level
    setData(modifiedRecord.reverse());
  };

  useEffect(() => {
    generateRecords();
  }, [enabled, month, category, records]);

  const updateAllRecordsToRedux = async () => {
    const response = await axios.get(`/api/getRecords/${user}`);
    const records: Record[] = response.data;
    updateRecordsToRedux(records);
  };

  const handleDelBtnClick = async (recordID: string) => {
    const request = { data: { recordID } };
    const response = await axios.delete("/api/deleteRecord", request);
    if (response.data.succ) {
      updateAllRecordsToRedux();
      message.success(response.data.message);
    } else {
      message.error(response.data.message);
    }
  };

  // 如果item未被选中，点击修改会选中该item并把item信息更新到redux
  const handleEditBtnClick = (record: Record) => {
    if (recordID !== record._id) {
      updateRecordIDToRedux(record._id);
      updateTitleToRedux(record.title);
      updateDescToRedux(record.description);
      updateAmountToRedux(record.amount);
      updateDateToRedux(record.recordDate);
    } else {
      updateRecordIDToRedux("");
    }
  };

  const handleConfirmEditBtnClick = async () => {
    if (recordDate === "") {
      message.warn("Please select a record date");
      return;
    }
    if (amount === 0) {
      message.warn("Amount must be greater than 0");
      return;
    }
    const edittedTitle = recordTitle === "" ? "No title" : recordTitle;
    const edittedDesc = description === "" ? "No description" : description;
    const request = {
      _id: recordID,
      updatedFields: {
        title: edittedTitle,
        amount,
        recordDate,
        description: edittedDesc,
      },
    };
    const response = await axios.put("/api/updateRecord", request);
    updateRecordIDToRedux("");
    updateAllRecordsToRedux();
    if (response.data.status) {
      message.success(response.data.message);
    } else {
      message.error(response.data.message);
    }
  };

  return (
    <>
      <List
        style={{ flex: 1 }}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item
            actions={[
              <EditOutlined
                onClick={() => {
                  handleEditBtnClick(item);
                }}
                style={{ color: COLORS.THEMEBLUE, cursor: "pointer" }}
                key="edit-item"
              ></EditOutlined>,
              <Button
                disabled={recordID !== item._id}
                type="primary"
                key="confirm-edit"
                size="small"
                onClick={handleConfirmEditBtnClick}
              >
                Confirm Edit
              </Button>,
              <Popconfirm
                key="delete-item"
                placement="topLeft"
                title="Deletion is permanent. Do you want to delete this record?"
                onConfirm={() => {
                  handleDelBtnClick(item._id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined
                  style={{ color: "#f5222d", cursor: "pointer" }}
                ></DeleteOutlined>
              </Popconfirm>,
            ]}
          >
            <ListItemMeta item={item}></ListItemMeta>
          </List.Item>
        )}
      />
    </>
  );
}

const mapState = (state: RootState) => {
  return {
    user: state.HomeReducer.uid,
    records: state.HomeReducer.records,
    enabled: state.FilterReducer.enabled,
    month: state.FilterReducer.month,
    category: state.FilterReducer.category,
    recordID: state.EditModalReducer.recordID,
    recordTitle: state.EditModalReducer.title,
    amount: state.EditModalReducer.amount,
    recordDate: state.EditModalReducer.date,
    description: state.EditModalReducer.description,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    updateRecordsToRedux(records: Record[]) {
      const action: UpdateRecords = {
        type: UPDATE_RECORDS,
        records,
      };
      dispatch(action);
    },
    updateRecordIDToRedux(recordID: string) {
      const action: UpdateRecordID = {
        type: UPDATE_RECORD_ID,
        recordID,
      };
      dispatch(action);
    },
    updateTitleToRedux(title: string) {
      const action: EditTitle = {
        type: EDIT_TITLE,
        title,
      };
      dispatch(action);
    },
    updateDescToRedux(description: string) {
      const action: EditDescription = {
        type: EDIT_DESCRIPTION,
        description,
      };
      dispatch(action);
    },
    updateAmountToRedux(amount: number) {
      const action: EditAmount = {
        type: EDIT_AMOUNT,
        amount,
      };
      dispatch(action);
    },
    updateDateToRedux(date: string) {
      const action: EditRecordDate = {
        type: EDIT_RECORD_DATE,
        date,
      };
      dispatch(action);
    },
  };
};

export default connect(mapState, mapDispatch)(RecordList);
