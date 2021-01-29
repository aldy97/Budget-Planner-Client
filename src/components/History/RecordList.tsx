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
  const [data, setData] = useState<Record[]>(recordList);
  const [selected, setSelected] = useState<Record>(dummySelected);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [recordDate, setRecordDate] = useState("");

  const [delID, setDelID] = useState("");

  useEffect(() => {
    setData(recordList);
  }, [records]);

  useEffect(() => {
    setTitle(selected.title);
    setDescription(selected.description);
    setAmount(selected.amount);
    setRecordDate(selected.recordDate);
  }, [selected]);

  const getSortData = (records: Record[]): Record[] => {
    const sortedData = records.sort((a, b) => {
      if (a.recordDate < b.recordDate) {
        return 1;
      }
      return a.amount >= b.amount ? 1 : -1;
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
    // caution: update state only at the top level
    setData(getSortData(modifiedRecord));
  };

  useEffect(() => {
    generateRecords();
  }, [filter]);

  const updateAllRecordsToRedux = async (): Promise<void> => {
    const response = await axios.get(`/api/getRecords/${currUser?._id}`);
    const records: Record[] = response.data.records;
    if (updateRecordsToRedux) {
      updateRecordsToRedux(records);
      console.log("updated");
    }
  };

  const onDeleteConfirm = async (recordID: string): Promise<void> => {
    const request = { data: { recordID } };
    const response = await axios.delete("/api/deleteRecord", request);
    console.log(response);
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
    if (amount === 0) {
      message.warn("Amount must be greater than 0");
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
    const response = await axios.put("/api/updateRecord", request);

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
        dataSource={getSortData(data)}
        renderItem={item => (
          <List.Item
            key={item._id}
            actions={[
              <EditOutlined
                onClick={() => {
                  handleEditBtnClick(item);
                }}
                style={{ color: COLORS.THEMEBLUE, cursor: "pointer" }}
                key="edit-item"
              ></EditOutlined>,
              <Button
                disabled={selected._id !== item._id}
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
                title="Are you sure you want to delete this record?"
                onConfirm={() => {
                  onDeleteConfirm(item._id);
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
            ]}
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
