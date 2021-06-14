import React from "react";
import {
  UserOutlined,
  LogoutOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Menu, Dropdown, Button, message } from "antd";
import axios from "axios";
import { RootState } from "../reducers";
import { useSelector } from "react-redux";
import { User } from "../reducers/HomeReducer";
import { URL } from "../utils/constants";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { UPDATE_USER_INFO, UpdateUserInfo } from "../actions/HomeAction";

const BASE_URL = process.env.NODE_ENV === "production" ? URL.production : URL.dev;

interface DropDown {
  user: User;
  updateUserInfo: (user: User) => void;
}

const UserDropDown: React.FC<DropDown> = props => {
  const { user, updateUserInfo } = props;
  const { showNumber } = useSelector((s: RootState) => {
    return {
      showNumber: s.HomeReducer.user.showNumber,
    };
  });

  const toggleNumberVisibility = async (): Promise<void> => {
    const request = { _id: user._id, updatedFields: { showNumber: !showNumber } };
    try {
      const response = await axios.put<{ user: User; message: string }>(
        `${BASE_URL}/api/updateUserInfo`,
        request
      );

      const { user } = response.data;
      updateUserInfo(user);
    } catch (err) {
      message.error("Server error, please try again later");
    }
  };

  const handleLogOutBtnClcik = (): void => {
    window.location.href = "/";
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a style={{ textAlign: "center" }} onClick={toggleNumberVisibility}>
          {!user.showNumber ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          <span>{user.showNumber ? "Hide number" : "Show number"}</span>
        </a>
      </Menu.Item>

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
        <span data-test="name">{user.name}</span>
      </Button>
    </Dropdown>
  );
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    updateUserInfo(user: User) {
      const action: UpdateUserInfo = {
        type: UPDATE_USER_INFO,
        user,
      };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatch)(UserDropDown);
