import React, { useState, useEffect } from "react";
import { Checkbox } from "antd";
import { UPDATE_RECORD_TYPE, UpdateType } from "../actions/ModalAction";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface TypeInputProps {
  updateRecordType: (type: string) => void;
}

function TypeInput({ updateRecordType }: TypeInputProps) {
  const [isExpense, setIsExpense] = useState(true);

  useEffect(() => {
    updateRecordType(isExpense ? "expense" : "income");
  }, [isExpense]);

  const onChange = () => {
    if (isExpense) {
      setIsExpense(false);
    } else {
      setIsExpense(true);
    }
  };

  return (
    <>
      <Checkbox onChange={onChange} checked={isExpense} data-test="expense">
        Expense
      </Checkbox>
      <Checkbox onChange={onChange} checked={!isExpense} data-test="income">
        Income
      </Checkbox>
    </>
  );
}

const mapDispatch = (dispatch: Dispatch) => {
  return {
    updateRecordType(recordType: string) {
      const action: UpdateType = {
        type: UPDATE_RECORD_TYPE,
        recordType,
      };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatch)(TypeInput);
