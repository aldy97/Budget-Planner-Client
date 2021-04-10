import React, { useState } from "react";
import Modal from "./Modal";
import UserDropDown from "./UserDropDown";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { connect } from "react-redux";
import { RootState } from "../reducers/index";
import { User } from "../reducers/HomeReducer";

interface HeaderProps {
  user?: User;
}

function Header({ user }: HeaderProps) {
  const currUser = user as User;
  const { Header } = Layout;
  const [visivle, setVisible] = useState(false);

  return (
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
        <UserDropDown name={currUser.name}></UserDropDown>
      </div>
      <Modal visible={visivle} setVisible={setVisible}></Modal>
    </Header>
  );
}

const mapState = (state: RootState) => {
  return {
    user: state.HomeReducer.user,
  };
};

export default connect(mapState, null)(Header);
