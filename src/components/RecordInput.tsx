import React from "react";
import TitleInput from "./TitleInput";
import DateInput from "./RecordDateInput";
import TypeInput from "./TypeInput";
import CategoryInput from "./CategoryInput";
import AmountInput from "./AmountInput";
import { Input, Space } from "antd";
import { UPDATE_DESCRIPTION, UpdateDescription } from "../actions/ModalAction";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const { TextArea } = Input;

interface RecordInputProps {
  updateDescToRedux?: any;
}

function RecordInput({ updateDescToRedux }: RecordInputProps) {
  const handleOnChange = (e: any) => {
    updateDescToRedux(e.target.value);
  };
  return (
    <Space size="middle" direction="vertical">
      <TitleInput></TitleInput>
      <DateInput></DateInput>
      <TypeInput></TypeInput>
      <CategoryInput></CategoryInput>
      <AmountInput></AmountInput>
      <TextArea
        size="middle"
        placeholder="Description (optional)"
        showCount
        onChange={handleOnChange}
        maxLength={50}
      />
    </Space>
  );
}

const mapDispatch = (dispatch: Dispatch) => {
  return {
    updateDescToRedux(desc: string) {
      const action: UpdateDescription = {
        type: UPDATE_DESCRIPTION,
        description: desc,
      };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatch)(RecordInput);
