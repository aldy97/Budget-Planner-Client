import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
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
  updateUserInfo: (user: User) => void;
}

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  const { updateUserInfo } = props;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginDisabled, setLoginDisabled] = useState<boolean>(false);

  const [isLogin, setIsLogin] = useState<boolean>(false);

  const initDevAccount = (): void => {
    setEmail("fengxiong@gmail.com");
    setPassword("1234567");
  };

  // Dev envrionment
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      initDevAccount();
    }
  }, []);

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
      setLoginDisabled(true);
      const response = await axios.post<{ user: User }>(
        `${BASE_URL}/api/login`,
        request
      );
      if (response.status === 201) {
        const user: User = response.data.user;
        message.success("Login Success!");
        updateUserInfo(user);
        setIsLogin(true);
      }
    } catch (err) {
      message.error("Login failed");
    }

    setLoginDisabled(false);
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
        <Input value={email} onChange={handleEmailChange} placeholder="Email:" />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password:"
        />
      </Form.Item>

      <Form.Item>
        <Button
          style={{ width: 360 }}
          type="primary"
          htmlType="submit"
          onClick={handleLoginBtnClick}
          disabled={loginDisabled}
        >
          {loginDisabled ? <LoadingOutlined /> : `Login`}
        </Button>
      </Form.Item>
    </StyledForm>
  ) : (
    <Redirect to="/home/overview"></Redirect>
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

export default connect(null, mapDispatch)(LoginForm);
