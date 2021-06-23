import React, { useState, useEffect } from "react";
import Logo from "./Login/Logo";
import styled from "styled-components";
import { Menu, Layout } from "antd";
import {
  LineChartOutlined,
  PieChartOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const StyledWord = styled.div`
  color: white;
  text-align: center;
  margin-top: -10px;
  margin-bottom: 10px;
  font-weight: bold;
  font-style: futura;
`;

const SideMenu: React.FC = () => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  const [index, setIndex] = useState("1");

  useEffect(() => {
    const location = window.location.href.split("/")[4];
    if (location === "overview") {
      setIndex("1");
    } else if (location === "diagram") {
      setIndex("2");
    } else if (location === "history") {
      setIndex("3");
    } else {
      setIndex("4");
    }
  }, [window.location.href]);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
      <div className="logo" style={{ cursor: "pointer", marginTop: -8 }}>
        <Logo size="medium" showWords={false}></Logo>
        <StyledWord>Budget Planner</StyledWord>
      </div>

      <Menu theme="dark" selectedKeys={[index]} mode="inline" data-test="menu">
        <Menu.Item key="1" icon={<PieChartOutlined />} data-test="overview">
          <Link to="/home/overview">Overview</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<LineChartOutlined />}>
          <Link to="/home/diagram">Diagram</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ProfileOutlined />}>
          <Link to="/home/history">History</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          <Link to="/home/account">My Account</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideMenu;
