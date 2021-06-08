import React, { useState, useEffect } from "react";
import { Record } from "../components/Overview/Content";
import CategorySelector from "./CategorySelector";
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
import { useHistory } from "react-router-dom";
import moment, { Moment } from "moment";
import axios from "axios";
import { URL } from "../utils/constants";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../reducers/index";
import {
  UpdateRecords,
  UPDATE_RECORDS,
  SET_LOADED,
  SetLoaded,
} from "../actions/HomeAction";
import * as HomeState from "../reducers/HomeReducer";
import { ErrorMessages } from "../utils/constants";

type ModalProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  updateRecordsToRedux: (records: Record[]) => void;
  setLoadedToBeTrue: () => void;
} & HomeState.HomeReducerProps;

const BASE_URL = process.env.NODE_ENV === "production" ? URL.production : URL.dev;

const AddRecordModal: React.FC<ModalProps> = ({
  visible,
  setVisible,
  user,
  updateRecordsToRedux,
  setLoadedToBeTrue,
}: ModalProps) => {
  const { TextArea } = Input;

  const [title, setTitle] = useState<string>("");
  const [recordDate, setRecordDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  const [type, setType] = useState<"expense" | "income">("expense");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [categoryError, setCategoryError] = useState<string>("");
  const [amountError, setAmountError] = useState<string>("");

  useEffect(() => {
    if (category) {
      setCategoryError("");
    }
    if (amount && !Number.isNaN(amount)) {
      setAmountError("");
    }
  }, [category, amount]);

  // only after one record is added successfully
  const clearFields = (): void => {
    setTitle("");
    setRecordDate(moment().format("YYYY-MM-DD"));
    setType("expense");
    setCategory("");
    setAmount("");
    setDescription("");
  };

  const clearErrorMessages = (): void => {
    setCategoryError("");
    setAmountError("");
  };

  const history = useHistory();

  const getRecords = async (): Promise<void> => {
    const response = await axios.get<{ records: Record[] }>(
      `${BASE_URL}/api/getRecords/${user._id}`
    );
    const records = response.data.records;

    updateRecordsToRedux(records);
    setLoadedToBeTrue();
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

    const cutLine = (user.budget * user.threshold) / 100;

    if (user.threshold && user.budget && expense >= cutLine) {
      const percentage = (expense * 100) / user.budget;
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
        )}% of your monthly budget: $${user.budget}`,
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
    if (!user._id) {
      history.push("/");
    }
  }, []);

  const onOk = async (): Promise<void> => {
    if (!category) {
      setCategoryError(ErrorMessages.MISSING_CATEGORY);
    }

    if (!amount) {
      setAmountError(ErrorMessages.MISSING_AMOUNT);
    } else if (parseInt(amount) <= 0) {
      setAmountError(ErrorMessages.INVALID_AMOUNT);
    }

    // when there is at least one error
    if (categoryError || amountError) return;

    const request = {
      title: title || "No title",
      userID: user._id,
      recordDate,
      type,
      category,
      amount,
      description: description || "No description",
    };

    const response = await axios.post<{ records: Record[]; message: string }>(
      `${BASE_URL}/api/createRecord`,
      request
    );

    if (response.status === 201) {
      const records = response.data.records;
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

    clearErrorMessages();
  };

  return (
    <Modal
      title="Please fill record details"
      visible={visible}
      onOk={onOk}
      confirmLoading={false}
      onCancel={() => {
        setVisible(false);
      }}
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
          <CategorySelector value={category} setCategory={setCategory} type={type} />
          <div style={{ marginTop: 2, color: "red" }}>{categoryError}</div>
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
          <div style={{ marginTop: 2, color: "red" }}>{amountError}</div>
        </div>
        <div>
          <div>Date:</div>
          <DatePicker
            allowClear={false}
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
};

const mapState = (state: RootState) => {
  return {
    ...state.HomeReducer,
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
    setLoadedToBeTrue() {
      const action: SetLoaded = { type: SET_LOADED };
      dispatch(action);
    },
  };
};

export default connect(mapState, mapDispatch)(AddRecordModal);
