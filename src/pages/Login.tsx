import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../components/Login/Logo";
import LoginRegToggler from "../components/Login/LoginRegToggler";
import LoginForm from "../components/Login/LoginForm";
import RegisterFrom from "../components/Login/RegisterForm";
import Footer from "../components/Login/Footer";

const StyledDesc = styled.div`
  text-align: center;
  margin-top: -20px;
  margin-bottom: 20px;
  color: #8c8c8c;
`;

function Login(): JSX.Element {
  const [isAtLogin, setIsAtLogin] = useState<boolean>(true);

  const toogle = () => {
    if (isAtLogin) {
      setIsAtLogin(false);
    } else {
      setIsAtLogin(true);
    }
  };

  return (
    <>
      <Logo size="large" showWords></Logo>
      <StyledDesc>A web app that helps you improve your financial status</StyledDesc>
      <LoginRegToggler atLogin={isAtLogin} toogle={toogle}></LoginRegToggler>
      {isAtLogin && <LoginForm></LoginForm>}
      {!isAtLogin && <RegisterFrom></RegisterFrom>}
      <Footer></Footer>
    </>
  );
}

export default Login;
