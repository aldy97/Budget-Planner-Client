import React from "react";
import { Modal } from "antd";

// Deprecated
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
