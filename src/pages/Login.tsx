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

const CenteredBox = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Login: React.FC = () => {
  const [isAtLogin, setIsAtLogin] = useState<boolean>(true);

  const toogle = (): void => {
    if (isAtLogin) {
      setIsAtLogin(false);
    } else {
      setIsAtLogin(true);
    }
  };

  return (
    <>
      <CenteredBox>
        <Logo size="large" showWords></Logo>
        <StyledDesc>
          A web app that helps you improve your financial status💰
        </StyledDesc>
        <LoginRegToggler atLogin={isAtLogin} toogle={toogle}></LoginRegToggler>
        {isAtLogin && <LoginForm></LoginForm>}
        {!isAtLogin && <RegisterFrom></RegisterFrom>}
      </CenteredBox>
      <Footer></Footer>
    </>
  );
};

export default Login;
