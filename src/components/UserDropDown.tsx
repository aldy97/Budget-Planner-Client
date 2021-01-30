import React from "react";
import { useHistory } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";

interface DropDown {
  name: string;
}

function UserDropDown({ name }: DropDown): JSX.Element {
  const history = useHistory();

  const handleLogOutBtnClcik = () => {
    history.push("/");
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a style={{ textAlign: "center" }} onClick={handleLogOutBtnClcik}>
          <LogoutOutlined style={{ color: "red" }} />
          <span>Log Out</span>
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} placement="bottomCenter">
      <Button>
        <UserOutlined></UserOutlined>
        <span data-test="name">{name}</span>
      </Button>
    </Dropdown>
  );
}

export default UserDropDown;
