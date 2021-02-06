import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, Checkbox, message } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { UPDATE_USER_INFO, UpdateUserInfo } from "../../actions/HomeAction";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { User } from "../../reducers/HomeReducer";
import { URL } from "../../utils/constants";

const BASE_URL = process.env.NODE_ENV === "production" ? URL.production : URL.dev;

export const StyledForm = styled(Form)`
  width: 360px;
  margin-left: auto;
  margin-right: auto;
`;

interface LoginFormProps {
  updateUserInfo?: (user: User) => void;
}

function LoginForm({ updateUserInfo }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLogin, setIsLogin] = useState(false);

  const handleLoginBtnClick = async (): Promise<void> => {
    if (!email) {
      message.info("Email is empty");
      return;
    }
    if (!password) {
      message.info("Password is empty");
      return;
    }

    const request = { email, password };
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, request);
      if (response.status === 201) {
        const user: User = response.data.user;
        message.success("Login Success!");
        updateUserInfo ? updateUserInfo(user) : null;
        setIsLogin(true);
      }
    } catch (err) {
      message.error("Login failed");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return !isLogin ? (
    <StyledForm name="basic" initialValues={{ remember: true }}>
      <Form.Item rules={[{ required: true, message: "Please input your email!" }]}>
        <Input onChange={handleEmailChange} placeholder="Email:" />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password onChange={handlePasswordChange} placeholder="Password:" />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          style={{ width: 360 }}
          type="primary"
          htmlType="submit"
          onClick={handleLoginBtnClick}
        >
          Login
        </Button>
      </Form.Item>
    </StyledForm>
  ) : (
    <Redirect to="/overview"></Redirect>
  );
}

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

export default connect(null, mapDispatch)(LoginForm);
