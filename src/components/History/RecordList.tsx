import React, { useState, useEffect } from "react";
import { User } from "../../reducers/HomeReducer";
import ListItemMeta from "./ListItemMeta";
import { COLORS } from "../../utils/constants";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Record } from "../Overview/Content";
import axios from "axios";
import { List, message, Popconfirm, Button } from "antd";
import { connect } from "react-redux";
import { RootState } from "../../reducers/index";
import { Dispatch } from "redux";
import { UpdateRecords, UPDATE_RECORDS } from "../../actions/HomeAction";
import { Filter } from "../../reducers/FilterReducer";
import moment from "moment";
import { URL } from "../../utils/constants";

interface List {
  user?: User;
  records?: Record[];
  filter?: Filter;
  updateRecordsToRedux?: (records: Record[]) => void;
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

function RecordList({ user, records, filter, updateRecordsToRedux }: List) {
  const recordList = records || [];
  const currUser = user ? user : null;
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

  const getSortData = (records: Record[]): Record[] => {
    const sortedData = records.sort((a, b) => {
      const date1 = moment(a.recordDate);
      const date2 = moment(b.recordDate);
      if (date1.isBefore(date2)) {
        return 1;
      } else if (moment(a.updatedOn).isBefore(moment(b.updatedOn))) {
        return 1;
      } else {
        return -1;
      }
    });

    return sortedData;
  };

  const generateRecords = (): void => {
    let modifiedRecord: Record[] = [];
    const enabled = filter?.enabled;
    const month = filter?.month;
    const category = filter?.category;
    if (!enabled || (month === "" && category === "")) {
      modifiedRecord = recordList;
    } else {
      if (month && category && month !== "" && category !== "") {
        modifiedRecord = recordList.filter(
          record =>
            record.category === category && record.recordDate.slice(0, 7) === month
        );
      } else if (!month && !category) {
        modifiedRecord = recordList;
      } else if (month && month !== "") {
        modifiedRecord = recordList.filter(
          record => record.recordDate.slice(0, 7) === month
        );
      } else {
        modifiedRecord = recordList.filter(record => record.category === category);
      }
    }

    setData(getSortData(modifiedRecord));
  };

  // every time recordList changes, regenerate a new recordList accordingly
  useEffect(() => {
    generateRecords();
  }, [recordList]);

  const updateAllRecordsToRedux = async (): Promise<void> => {
    const response = await axios.get(`${URL}/api/getRecords/${currUser?._id}`);
    const records: Record[] = response.data.records;
    if (updateRecordsToRedux) {
      updateRecordsToRedux(records);
    }
  };

  const onDeleteConfirm = async (recordID: string): Promise<void> => {
    const request = { data: { recordID } };
    const response = await axios.delete(`${URL}/api/deleteRecord`, request);
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
    const response = await axios.put(`${URL}/api/updateRecord`, request);

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
}

const mapState = (state: RootState) => {
  return {
    user: state.HomeReducer.user,
    records: state.HomeReducer.records,
    filter: state.FilterReducer.filter,
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
  };
};

export default connect(mapState, mapDispatch)(RecordList);
