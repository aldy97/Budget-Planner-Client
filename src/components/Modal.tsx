import React, { useState, useEffect } from "react";
import { Record } from "../components/Overview/Content";
import ExpenseSelector from "./ExpenseSelector";
import IncomeSelector from "./IncomeSelector";
import {
  message,
  Modal,
  Input,
  Space,
  DatePicker,
  Checkbox,
  notification,
  Button,
} from "antd";
import { NotificationOutlined } from "@ant-design/icons";
import { User } from "../reducers/HomeReducer";
import { useHistory } from "react-router-dom";
import moment, { Moment } from "moment";
import axios from "axios";
import { URL } from "../utils/constants";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../reducers/index";
import { UpdateRecords, UPDATE_RECORDS } from "../actions/HomeAction";

interface ModalProps {
  visible: boolean;
  setVisible: any;
  user?: User;
  records: Record[];
  updateRecordsToRedux?: (records: Record[]) => void;
}

const BASE_URL = process.env.NODE_ENV === "production" ? URL.production : URL.dev;

function AddRecordModal({
  visible,
  setVisible,
  user,
  records,
  updateRecordsToRedux,
}: ModalProps) {
  const currUser = user as User;
  const { TextArea } = Input;

  const [title, setTitle] = useState<string>("");
  const [recordDate, setRecordDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  const [type, setType] = useState<"expense" | "income">("expense");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // only after one record is added successfully
  const clearFields = (): void => {
    setTitle("");
    setRecordDate(moment().format("YYYY-MM-DD"));
    setType("expense");
    setCategory("");
    setAmount("");
    setDescription("");
  };

  const history = useHistory();

  const getRecords = async (): Promise<void> => {
    const response = await axios.get(`${BASE_URL}/api/getRecords/${currUser._id}`);
    const records: Record[] = response.data.records;
    updateRecordsToRedux ? updateRecordsToRedux(records) : null;
  };

  // determines whether shows nitification after a new record is stored
  const showNotification = (records: Record[]): void => {
    const expense: number = records
      .filter(
        record =>
          record.type === "expense" && moment().isSame(record.recordDate, "month")
      )
      .map(record => record.amount)
      .reduce((acc, curr) => acc + curr, 0);
    const cutLine = (currUser.budget * currUser.threshold) / 100;

    if (currUser.threshold && currUser.budget && expense >= cutLine) {
      const percentage = (expense * 100) / currUser.budget;
      const key = "notify user";
      const btn = (
        <Button type="primary" size="small" onClick={() => notification.close(key)}>
          Confirm
        </Button>
      );
      notification.open({
        message: <strong>Budget threshold notification</strong>,
        description: `You have spent ${percentage.toFixed(
          2
        )}% of your monthly budget: $${currUser.budget}`,
        icon: <NotificationOutlined style={{ color: "#108ee9" }} />,
        btn,
        key,
      });
    }
  };

  // adding `,[]` makes sure that it only excute getRecords once when it is mounted
  useEffect(() => {
    getRecords();
  }, []);

  useEffect(() => {
    if (!currUser._id) {
      history.push("/");
    }
  }, []);

  const onOk = async (): Promise<void> => {
    if (!category) {
      message.error("Category is not selected");
      return;
    }

    if (!recordDate) {
      message.error("Record date is not determined");
      return;
    }

    if (moment(recordDate).isAfter(moment())) {
      message.error("The date can not be future date");
      return;
    }

    if (!amount) {
      message.error("Amount must be provided");
      return;
    }

    if (parseInt(amount) <= 0) {
      message.error("Amount must be greater than 0");
      return;
    }

    const request = {
      title: title || "No title",
      userID: currUser._id,
      recordDate,
      type,
      category,
      amount,
      description: description || "No description",
    };

    const response = await axios.post(`${BASE_URL}/api/createRecord`, request);

    if (response.status === 201) {
      const records: Record[] = response.data.records;
      message.success("Record is added successfully");
      if (updateRecordsToRedux) {
        updateRecordsToRedux(records);
      }
      type === "expense" ? showNotification(records) : null;
      clearFields();
      setVisible(false);
    } else {
      message.error(response.data.message);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="Please fill record details"
      visible={visible}
      onOk={onOk}
      confirmLoading={false}
      onCancel={handleCancel}
    >
      <Space direction="vertical">
        <div>
          <div>Title:</div>
          <Input
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          ></Input>
        </div>
        <div>
          <div>Type:</div>
          <Checkbox
            checked={type === "expense"}
            onChange={() => {
              setType("expense");
              setCategory("");
            }}
          >
            Expense
          </Checkbox>
          <Checkbox
            checked={type === "income"}
            onChange={() => {
              setType("income");
              setCategory("");
            }}
          >
            Income
          </Checkbox>
        </div>
        <div>
          <div>Category:</div>
          {type === "expense" && <ExpenseSelector setCategory={setCategory} />}
          {type === "income" && <IncomeSelector setCategory={setCategory} />}
        </div>
        <div>
          <div>Amount:</div>
          <Input
            value={amount}
            onChange={e => {
              setAmount(e.target.value);
            }}
            prefix="$"
            suffix="CAD"
            type="number"
          ></Input>
        </div>
        <div>
          <div>Date:</div>
          <DatePicker
            value={moment(recordDate)}
            onChange={(value: Moment | null, dateString: string) => {
              setRecordDate(dateString);
            }}
          />
        </div>
        <div>
          <div>Description:</div>
          <TextArea
            value={description}
            maxLength={50}
            onChange={e => {
              setDescription(e.target.value);
            }}
          ></TextArea>
        </div>
      </Space>
    </Modal>
  );
}

const mapState = (state: RootState) => {
  return {
    user: state.HomeReducer.user,
    records: state.HomeReducer.records,
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

export default connect(mapState, mapDispatch)(AddRecordModal);
