import React from "react";
import styled from "styled-components";
import { Space } from "antd";
import { GithubOutlined, BugOutlined } from "@ant-design/icons";

const FooterWrapper = styled.div`
  text-align: center;
  position: absolute;
  bottom: 20px;
  left: 30%;
  right: 30%;
`;

const NameStyle = {
  cursor: "pointer",
};

const StyledSpace = styled(Space)`
  .icon {
    color: #8c8c8c;
    cursor: pointer;
  }
  .icon: hover {
    color: #1f1f1f;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }
`;

function Footer(): JSX.Element {
  return (
    <FooterWrapper>
      <StyledSpace direction="horizontal" size="large">
        <GithubOutlined
          className="icon"
          onClick={() => {
            window.open("https://github.com/aldy97/Budget-Planner");
          }}
        />
        <BugOutlined
          className="icon"
          onClick={() => {
            window.open("https://github.com/aldy97/Budget-Planner/issues");
          }}
        />
      </StyledSpace>
      <div>
        Budget Planner ©2020 Created by{" "}
        <span
          style={NameStyle}
          onClick={() => {
            window.open("https://github.com/aldy97");
          }}
        >
          Feng
        </span>{" "}
        With ❤️
      </div>
    </FooterWrapper>
  );
}

export default Footer;
