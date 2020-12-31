import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, Checkbox, message } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  UPDATE_BUDGET,
  UpdateBudget,
  UPDATE_BUDGET_THRESHOLD,
  UpdateBudgetThreshold,
} from "../../actions/AccountAction";
import {
  UPDATE_USER_EMAIL,
  UpdateEmail,
  UpdateUID,
  UPDATE_USER_ID,
  UPDATE_USER_NAME,
  UpdateName,
} from "../../actions/HomeAction";
import { connect } from "react-redux";
import { Dispatch } from "redux";

export const StyledForm = styled(Form)`
  width: 360px;
  margin-left: auto;
  margin-right: auto;
`;

interface LoginFormProps {
  updateEmail: (email: string) => void;
  updateUserID: (id: string) => void;
  updateName: (name: string) => void;
  updateBudget: (budget: number) => void;
  updateThreshold: (threshold: number) => void;
}

function LoginForm({
  updateEmail,
  updateUserID,
  updateName,
  updateBudget,
  updateThreshold,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLogin, setIsLogin] = useState(false);

  const handleLoginBtnClick = async () => {
    const request = { email, password };
    const response = await axios.post("/api/login", request);
    const isLogin = response.data.login;
    const messageText = response.data.message;
    if (isLogin) {
      message.success("Login Success!");
      updateEmail(email);
      updateUserID(response.data.uid);
      updateName(response.data.name);
      setIsLogin(true);
      updateBudget(response.data.budget);
      updateThreshold(response.data.threshold);
    } else {
      message.error(messageText);
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
    updateEmail(email: string) {
      const action: UpdateEmail = { type: UPDATE_USER_EMAIL, email };
      dispatch(action);
    },
    updateUserID(uid: string) {
      const action: UpdateUID = { type: UPDATE_USER_ID, uid };
      dispatch(action);
    },
    updateName(name: string) {
      const action: UpdateName = { type: UPDATE_USER_NAME, name };
      dispatch(action);
    },
    updateBudget(budget: number) {
      const action: UpdateBudget = {
        type: UPDATE_BUDGET,
        budget,
      };
      dispatch(action);
    },
    updateThreshold(threshold: number) {
      const action: UpdateBudgetThreshold = {
        type: UPDATE_BUDGET_THRESHOLD,
        threshold,
      };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatch)(LoginForm);
