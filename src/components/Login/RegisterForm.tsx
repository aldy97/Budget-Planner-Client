import React, { useState } from "react";
import { StyledForm } from "./LoginForm";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";
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

interface RegisterFormProps {
  updateEmail?: any;
  updateUserID?: any;
  updateName?: any;
}

function RegisterFrom({ updateEmail, updateName, updateUserID }: RegisterFormProps) {
  const [isRegistered, setIsRegistered] = useState(false);

  const [email, setEmail] = useState("");

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: any) => {
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
      updateEmail(email);
      updateUserID(response.data.uid);
      updateName(response.data.name);
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
  };
};

export default connect(null, mapDispatch)(RegisterFrom);
