import React, { useState, useEffect } from "react";
import { Record } from "../components/Overview/Content";
import ExpenseSelector from "./ExpenseSelector";
import IncomeSelector from "./IncomeSelector";
import { message, Modal, Input, Space, DatePicker, Checkbox } from "antd";
import { User } from "../reducers/HomeReducer";
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
  updateRecordsToRedux?: (records: Record[]) => void;
}

function AddRecordModal({
  visible,
  setVisible,
  user,
  updateRecordsToRedux,
}: ModalProps) {
  const currUser = user as User;
  const { TextArea } = Input;

  const [title, setTitle] = useState("");
  const [recordDate, setRecordDate] = useState(moment().format("LLL"));
  const [type, setType] = useState<"expense" | "income">("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const getRecords = async (): Promise<void> => {
    const response = await axios.get(`/api/getRecords/${currUser._id}`);
    const records: Record[] = response.data.records;
    updateRecordsToRedux ? updateRecordsToRedux(records) : null;
  };

  useEffect(() => {
    getRecords();
  });

  const onOk = async (): Promise<void> => {
    if (!category) {
      message.error("Category is not selected");
      return;
    }

    if (!recordDate) {
      message.error("Record date is not selected");
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

    const response = await axios.post(`${URL}/api/createRecord`, request);
    console.log(response);
    setVisible(false);
    if (response.status === 201) {
      message.success(response.data.message);
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
            onChange={(value: Moment | null, dateString: string) => {
              setRecordDate(dateString);
            }}
          />
        </div>
        <div>
          <div>Description:</div>
          <TextArea
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
