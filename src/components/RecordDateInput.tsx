import React from "react";
import moment from "moment";
import { DatePicker } from "antd";
import { UPDATE_RECORD_DATE, UpdateRecordDate } from "../actions/ModalAction";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../reducers/index";

interface DateInput {
  recordDate?: string;
  updateRecordDateToRedux?: any;
}

function RecordDateInput({ recordDate, updateRecordDateToRedux }: DateInput) {
  const onChange = (date: any, dateString: string) => {
    updateRecordDateToRedux(dateString);
  };

  return <DatePicker defaultValue={moment(recordDate)} onChange={onChange} />;
}

const mapState = (state: RootState) => {
  return {
    recordDate: state.ModalReducer.recordDate,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    updateRecordDateToRedux(recordDate: string) {
      const action: UpdateRecordDate = {
        type: UPDATE_RECORD_DATE,
        recordDate,
      };
      dispatch(action);
    },
  };
};

export default connect(mapState, mapDispatch)(RecordDateInput);
