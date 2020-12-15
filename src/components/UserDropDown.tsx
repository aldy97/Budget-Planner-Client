import React from "react";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";

interface DropDown {
  name: string;
}

function UserDropDown({ name }: DropDown) {
  const handleLogOutBtnClcik = () => {
    window.location.href = "/";
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
        {name}
      </Button>
    </Dropdown>
  );
}

export default UserDropDown;
