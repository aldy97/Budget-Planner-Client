import React, { useState } from "react";
import { StyledForm } from "./LoginForm";
import { Form, Input, Button, message } from "antd";
import { UPDATE_USER_INFO, UpdateUserInfo } from "../../actions/HomeAction";
import { User } from "../../reducers/HomeReducer";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface RegisterFormProps {
  updateUserInfo: (user: User) => void;
}

function RegisterFrom({ updateUserInfo }: RegisterFormProps): JSX.Element {
  const [isRegistered, setIsRegistered] = useState(false);

  const [email, setEmail] = useState("");

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegisterBtnClick = async () => {
    const request = {
      name: name,
      password: password,
      confirmPassword: confirmPassword,
      email: email,
    };
    const response = await axios.post(`/api/register`, request);
    if (response.data.result === "succ") {
      message.success("Registration Success!");
      setIsRegistered(true);
    } else {
      message.error(response.data.message);
    }
  };

  return !isRegistered ? (
    <StyledForm name="basic" initialValues={{ remember: true }}>
      <Form.Item rules={[{ required: true, message: "Please input your email!" }]}>
        <Input onChange={handleEmailChange} placeholder="Email:" />
      </Form.Item>

      <Form.Item rules={[{ required: true, message: "Please input your name!" }]}>
        <Input onChange={handleNameChange} placeholder="Name:" />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password onChange={handlePasswordChange} placeholder="Password:" />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm password:"
        />
      </Form.Item>

      <Form.Item>
        <Button
          style={{ width: 360 }}
          type="primary"
          htmlType="submit"
          onClick={handleRegisterBtnClick}
        >
          Register
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

export default connect(null, mapDispatch)(RegisterFrom);
