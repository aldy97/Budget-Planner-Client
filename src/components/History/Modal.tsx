import React, { useState, useEffect } from "react";
import RecordInput from "../RecordInput";
import { Record } from "../Overview/Content";
import { message } from "antd";
import axios from "axios";
import { Modal } from "antd";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../reducers/index";

interface UpdateModalProps {
  visible: boolean;
  setVisible: any;
}

// 点击Icon后出现的修改记录对话框
function UpdateModal({ visible, setVisible }: UpdateModalProps) {
  return (
    <>
      <Modal
        title={"Fill out record details"}
        visible={visible}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        // onCancel={handleCancel}
      >
        <RecordInput></RecordInput>
      </Modal>
    </>
  );
}

export default UpdateModal;
