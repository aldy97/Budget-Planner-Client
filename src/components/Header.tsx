import React, { useState } from "react";
import Modal from "./Modal";
import HeaderMenu from "./HeaderMenu";
import UserDropDown from "./UserDropDown";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../reducers/index";

const Header: React.FC = () => {
  const { user } = useSelector((s: RootState) => {
    return { user: s.HomeReducer.user };
  });

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
        style={{ marginLeft: -33, marginRight: 16 }}
      >
        Add Record
      </Button>
      {user.hideSideMenu && <HeaderMenu />}
      <div style={{ float: "right", marginRight: -33 }}>
        <UserDropDown user={user}></UserDropDown>
      </div>
      <Modal visible={visivle} setVisible={setVisible}></Modal>
    </Header>
  );
};

export default Header;
