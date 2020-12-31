import React, { useEffect } from "react";
import RecordInput from "./RecordInput";
import { Record } from "../components/Overview/Content";
import { message, Modal } from "antd";
import axios from "axios";
import { UpdateRecords, UPDATE_RECORDS } from "../actions/HomeAction";
import { CLEAR_RECORD, ClearRecord } from "../actions/ModalAction";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../reducers/index";

interface ModalProps {
  visible: boolean;
  setVisible: any;
  user?: string;
  title?: string;
  recordDate?: string;
  type?: string;
  category?: string;
  amount?: number;
  description?: string;
  clearRecord?: any;
  updateRecordsToRedux?: any;
}

function AddRecordModal({
  visible,
  setVisible,
  user,
  title,
  recordDate,
  type,
  category,
  amount,
  description,
  clearRecord,
  updateRecordsToRedux,
}: ModalProps) {
  // const [confirmLoading, setConfirmLoading] = useState(false);

  const updateAllRecordsToRedux = async () => {
    const response = await axios.get(`/api/getRecords/${user}`);
    const records: Record[] = response.data;
    updateRecordsToRedux(records);
  };

  useEffect(() => {
    updateAllRecordsToRedux();
  }, []);

  const handleOk = async () => {
    const request = {
      title,
      user,
      recordDate,
      type,
      category,
      amount,
      description,
    };
    if (!category) {
      message.warn("Please choose a category");
      return;
    }
    if (!recordDate) {
      message.warn("please choose a date");
      return;
    }
    const response = await axios.post("/api/createRecord", request);
    setVisible(false);
    if (response.data.status) {
      message.success(response.data.message);
    } else {
      message.error(response.data.message);
    }
    // clearRecord();
    updateAllRecordsToRedux();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="Please fill record details"
      visible={visible}
      onOk={handleOk}
      confirmLoading={false}
      onCancel={handleCancel}
    >
      <RecordInput></RecordInput>
    </Modal>
  );
}

const mapState = (state: RootState) => {
  return {
    user: state.HomeReducer.uid,
    title: state.ModalReducer.title,
    recordDate: state.ModalReducer.recordDate,
    type: state.ModalReducer.recordType,
    category: state.ModalReducer.category,
    amount: state.ModalReducer.amount,
    description: state.ModalReducer.description,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    clearRecord() {
      const action: ClearRecord = {
        type: CLEAR_RECORD,
      };
      dispatch(action);
    },
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
