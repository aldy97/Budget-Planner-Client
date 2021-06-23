import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Button } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/home/overview">Overview</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/home/diagram">Diagram</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/home/history">History</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/home/account">My Account</Link>
    </Menu.Item>
  </Menu>
);

const HeaderMenu: React.FC = () => {
  return (
    <Dropdown overlay={menu} placement="bottomCenter">
      <Button>
        <MenuFoldOutlined />
        Navigation
      </Button>
    </Dropdown>
  );
};

export default HeaderMenu;
