import React from "react";
import styled from "styled-components";

const Wrapper = styled.div<LogoProps>`
  padding-top: ${props => (props.size === "large" ? "56px" : "20px")};
  text-align: center;
  margin-bottom: 20px;
`;

const LogoWrapper = styled.div<LogoProps>`
  width: ${props => (props.size === "large" ? "100px" : "40px")};
  height: ${props => (props.size === "large" ? "100px" : "40px")};
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  line-height: ${props => (props.size === "large" ? "100px" : "40px")};
  font-size: ${props => (props.size === "large" ? "50px" : "20px")};
  font-style: futura;
  color: white;
  background: linear-gradient(rgb(66, 161, 236), rgb(0, 112, 201));
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Name = styled.div`
  font-size: 30px;
  font-style: futura;
  font-weight: bold;
`;

interface LogoProps {
  showWords?: boolean;
  size?: "large" | "medium";
}

function Logo({ showWords, size }: LogoProps) {
  return (
    <Wrapper size={size}>
      <LogoWrapper size={size}>BP</LogoWrapper>
      {showWords && <Name>Budget Planner</Name>}
    </Wrapper>
  );
}

export default Logo;
