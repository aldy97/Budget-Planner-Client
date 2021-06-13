import React, { useState, useEffect } from "react";
import ListItemMeta from "./ListItemMeta";
import { COLORS } from "../../utils/constants";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Record } from "../Overview/Content";
import { List, message, Popconfirm, Button } from "antd";
import { connect } from "react-redux";
import { RootState } from "../../reducers/index";
import { Dispatch } from "redux";
import { UpdateRecords, UPDATE_RECORDS } from "../../actions/HomeAction";
import moment from "moment";
import axios from "axios";
import { URL } from "../../utils/constants";
import { useSelector } from "react-redux";

const BASE_URL = process.env.NODE_ENV === "production" ? URL.production : URL.dev;

interface List {
  updateRecordsToRedux: (records: Record[]) => void;
}

interface UpdateRequest {
  _id: string;
  updatedFields: {
    [key: string]: string | number;
  };
}

const dummySelected: Record = {
  _id: "string",
  amount: 0,
  description: "",
  title: "",
  type: "",
  category: "",
  recordDate: "",
  createdOn: "",
  updatedOn: "",
};

const RecordList: React.FC<List> = ({ updateRecordsToRedux }) => {
  const { user, records, filter } = useSelector((state: RootState) => ({
    user: state.HomeReducer.user,
    records: state.HomeReducer.records,
    filter: state.FilterReducer.filter,
  }));

  const [data, setData] = useState<Record[]>([]);
  const [selected, setSelected] = useState<Record>(dummySelected);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [recordDate, setRecordDate] = useState("");

  const [delID, setDelID] = useState("");

  useEffect(() => {
    setTitle(selected.title);
    setDescription(selected.description);
    setAmount(selected.amount);
    setRecordDate(selected.recordDate);
  }, [selected]);

  // sort from latest to earliest
  const getSortData = (records: Record[]): Record[] => {
    return records.sort((a, b) => {
      if (moment(a.recordDate).isBefore(b.recordDate)) {
        return 1;
      } else if (moment(b.recordDate).isBefore(a.recordDate)) {
        return -1;
      } else {
        return a.amount > b.amount ? 1 : -1;
      }
    });
  };

  const generateRecords = (): void => {
    let list: Record[] = [];
    const { month, enabled, category } = filter;
    // when filter does not need to be activated
    if (!enabled || (!month && !category)) {
      list = getSortData(records);
    } else if (month && category) {
      list = records
        .filter(record => record.recordDate.slice(0, 7) === month)
        .filter(record => record.category === category);
    } else if (month) {
      list = records.filter(record => record.recordDate.slice(0, 7) === month);
    } else if (category) {
      list = records.filter(record => record.category === category);
    }

    setData(getSortData(list));
  };

  useEffect(() => {
    generateRecords();
  }, [records, filter]);

  const updateAllRecordsToRedux = async (): Promise<void> => {
    const response = await axios.get(`${BASE_URL}/api/getRecords/${user._id}`);
    const records: Record[] = response.data.records;

    updateRecordsToRedux(records);
  };

  const onDeleteConfirm = async (recordID: string): Promise<void> => {
    const request = { data: { recordID } };
    const response = await axios.delete(`${BASE_URL}/api/deleteRecord`, request);
    if (response.status === 202) {
      updateAllRecordsToRedux();
      message.success(response.data.message);
    } else {
      message.error(response.data.message);
    }
  };

  const handleEditBtnClick = (record: Record): void => {
    if (record._id !== selected._id) {
      setSelected(record);
    } else {
      setSelected(dummySelected);
    }
  };

  const handleConfirmEditBtnClick = async (): Promise<void> => {
    if (recordDate === "") {
      message.warn("Please select a record date");
      return;
    }
    if (!amount) {
      message.warn("Amount must be filled and it has to be greater than 0");
      return;
    }

    const request: UpdateRequest = {
      _id: selected._id,
      updatedFields: {
        title: title || "No title",
        amount,
        recordDate,
        description: description || "No description",
      },
    };

    const response = await axios.put<{ message: string }>(
      `${BASE_URL}/api/updateRecord`,
      request
    );

    if (response.status === 200) {
      message.success(response.data.message);
      updateAllRecordsToRedux();
      setSelected(dummySelected);
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
            key={item._id}
            actions={
              selected._id === item._id
                ? [
                    <EditOutlined
                      onClick={() => {
                        handleEditBtnClick(item);
                      }}
                      style={{ color: COLORS.THEMEBLUE, cursor: "pointer" }}
                      key="edit-item"
                    ></EditOutlined>,
                    <Popconfirm
                      key="delete-item"
                      placement="topLeft"
                      title="Are you sure you want to delete this record?"
                      onConfirm={() => {
                        onDeleteConfirm(delID);
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        onClick={() => {
                          setDelID(item._id);
                        }}
                        style={{ color: "#f5222d", cursor: "pointer" }}
                      ></DeleteOutlined>
                    </Popconfirm>,
                    <Button
                      type="primary"
                      key="confirm-edit"
                      size="small"
                      onClick={handleConfirmEditBtnClick}
                    >
                      Confirm Edit
                    </Button>,
                  ]
                : [
                    <EditOutlined
                      onClick={() => {
                        handleEditBtnClick(item);
                      }}
                      style={{ color: COLORS.THEMEBLUE, cursor: "pointer" }}
                      key="edit-item"
                    ></EditOutlined>,
                    <Popconfirm
                      key="delete-item"
                      placement="topLeft"
                      title="Are you sure you want to delete this record?"
                      onConfirm={() => {
                        onDeleteConfirm(delID);
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        onClick={() => {
                          setDelID(item._id);
                        }}
                        style={{ color: "#f5222d", cursor: "pointer" }}
                      ></DeleteOutlined>
                    </Popconfirm>,
                  ]
            }
          >
            <ListItemMeta
              user={user}
              selected={selected}
              item={item}
              setTitle={setTitle}
              setDescription={setDescription}
              setAmount={setAmount}
              setRecordDate={setRecordDate}
              data-test="list-item"
            ></ListItemMeta>
          </List.Item>
        )}
      />
    </>
  );
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
  };
};

export default connect(null, mapDispatch)(RecordList);
