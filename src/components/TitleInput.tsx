import React from "react";
import { Input } from "antd";
import { UPDATE_TITLE, UpdateTitle } from "../actions/ModalAction";
import { connect } from "react-redux";
import { RootState } from "../reducers/index";
import { Dispatch } from "redux";

interface TitleInputProps {
  title?: string;
  updateTitleToRedux: (title: string) => void;
}

function TitleInput({ updateTitleToRedux, title }: TitleInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTitleToRedux(e.target.value);
  };
  return (
    <Input
      defaultValue={title}
      onChange={handleInputChange}
      placeholder="Title (optional)"
    ></Input>
  );
}

const mapState = (state: RootState) => {
  return {
    title: state.ModalReducer.title,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    updateTitleToRedux(title: string) {
      const action: UpdateTitle = {
        type: UPDATE_TITLE,
        title,
      };
      dispatch(action);
    },
  };
};

export default connect(mapState, mapDispatch)(TitleInput);
