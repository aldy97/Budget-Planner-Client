import React, { useState } from "react";
import { StyledForm } from "./LoginForm";
import { Form, Input, Button, message } from "antd";
import { UPDATE_USER_INFO, UpdateUserInfo } from "../../actions/HomeAction";
import { User } from "../../reducers/HomeReducer";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { URL } from "../../utils/constants";

const BASE_URL = process.env.NODE_ENV === "production" ? URL.production : URL.dev;

interface RegisterFormProps {
  updateUserInfo: (user: User) => void;
}

const RegisterFrom: React.FC<RegisterFormProps> = ({
  updateUserInfo,
}: RegisterFormProps) => {
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

  const handleRegisterBtnClick = async (): Promise<void> => {
    const request = {
      name,
      password,
      confirmPassword,
      email,
    };

    try {
      const response = await axios.post<{ user: User; message: string }>(
        `${BASE_URL}/api/register`,
        request
      );
      if (response.status === 201) {
        const user = response.data.user;
        updateUserInfo(user);
        message.success("Registration Success!");
        setIsRegistered(true);
      } else {
        message.error(response.data.message);
      }
    } catch (e) {
      message.error("Unexpected error, please try again");
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

export default connect(null, mapDispatch)(RegisterFrom);
