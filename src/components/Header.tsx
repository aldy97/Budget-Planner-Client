import React, { useState } from "react";
import Modal from "./Modal";
import UserDropDown from "./UserDropDown";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { connect } from "react-redux";
import { RootState } from "../reducers/index";
import { Redirect } from "react-router-dom";

interface HeaderProps {
  name?: string;
}

function Header({ name }: HeaderProps) {
  const { Header } = Layout;
  const [visivle, setVisible] = useState(false);
  const [isLogOut, setIsLogOut] = useState(false);

  return !isLogOut ? (
    <Header className="site-layout-background">
      <Button
        onClick={() => {
          setVisible(true);
        }}
        type="primary"
        shape="round"
        icon={<EditOutlined />}
        size="large"
        style={{ marginLeft: -33 }}
      >
        Add Record
      </Button>
      <div style={{ float: "right", marginRight: -33 }}>
        <UserDropDown name={name as string}></UserDropDown>
      </div>
      <Modal visible={visivle} setVisible={setVisible}></Modal>
    </Header>
  ) : (
    <Redirect to="/"> </Redirect>
  );
}

const mapState = (state: RootState) => {
  return {
    name: state.HomeReducer.name,
  };
};

export default connect(mapState, null)(Header);
