import React from "react";
import { Modal } from "antd";

// 点击Icon后出现的修改记录对话框
function UpdateModal(): JSX.Element {
  return (
    <>
      <Modal
        title={"Fill out record details"}
        visible={true}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        // onCancel={handleCancel}
      ></Modal>
    </>
  );
}

export default UpdateModal;
