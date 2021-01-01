import React, { useState } from "react";
import Logo from "./Login/Logo";
import styled from "styled-components";
import { Menu, Layout } from "antd";
import {
  LineChartOutlined,
  PieChartOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { UPDATE_RECORD_ID, UpdateRecordID } from "../actions/EditModallAction";
import { Redirect } from "react-router-dom";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { CLEAR_RECORD, ClearRecord } from "../actions/ModalAction";

const StyledWord = styled.div`
  color: white;
  text-align: center;
  margin-top: -10px;
  margin-bottom: 10px;
  font-weight: bold;
  font-style: futura;
`;

interface MenuProps {
  selected: number;
  clearRecord: () => void;
  resetRecordID: () => void;
}

function SideMenu({ selected, clearRecord, resetRecordID }: MenuProps) {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [path, setPath] = useState("");

  const UrlParam = window.location.href.split("/")[3];

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuItemClick = (route: string) => {
    if (UrlParam !== route) {
      setPath(`/${route}`);
      clearRecord();
      resetRecordID();
    }
  };

  return !path ? (
    <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
      <div
        className="logo"
        style={{ cursor: "pointer", marginTop: -8 }}
        onClick={() => {
          handleMenuItemClick("overview");
        }}
      >
        <Logo size="medium" showWords={false}></Logo>
        <StyledWord>Budget Planner</StyledWord>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={[`${selected}`]}
        mode="inline"
        data-test="menu"
      >
        <Menu.Item
          key="1"
          icon={<PieChartOutlined />}
          onClick={() => {
            handleMenuItemClick("overview");
          }}
          data-test="overview"
        >
          Overview
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<LineChartOutlined />}
          onClick={() => {
            handleMenuItemClick("diagram");
          }}
        >
          Diagram
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<ProfileOutlined />}
          onClick={() => {
            handleMenuItemClick("history");
          }}
        >
          History
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<UserOutlined />}
          onClick={() => {
            handleMenuItemClick("account");
          }}
        >
          My Account
        </Menu.Item>
      </Menu>
    </Sider>
  ) : (
    <Redirect to={path}></Redirect>
  );
}

const mapDispatch = (dispatch: Dispatch) => {
  return {
    clearRecord() {
      const action: ClearRecord = {
        type: CLEAR_RECORD,
      };
      dispatch(action);
    },
    resetRecordID() {
      const action: UpdateRecordID = {
        type: UPDATE_RECORD_ID,
        recordID: "",
      };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatch)(SideMenu);
