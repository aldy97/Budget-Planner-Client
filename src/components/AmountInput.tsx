import React from "react";
import { InputNumber } from "antd";
import { UPDATE_AMOUNT, UpdateAmount } from "../actions/ModalAction";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface AmountInputProps {
  updateCategoryToRedux: (amount: number) => void;
}

function AmountInput({ updateCategoryToRedux }: AmountInputProps) {
  const onChange = (value: string | number | undefined): void => {
    updateCategoryToRedux(value as number);
  };

  return (
    <InputNumber
      style={{ display: "block" }}
      defaultValue={0}
      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      onChange={onChange}
      data-test="input"
    />
  );
}

const mapDispatch = (dispatch: Dispatch) => {
  return {
    updateCategoryToRedux(amount: number) {
      const action: UpdateAmount = {
        type: UPDATE_AMOUNT,
        amount,
      };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatch)(AmountInput);
