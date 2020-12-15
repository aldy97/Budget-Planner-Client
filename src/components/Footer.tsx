import React from "react";
import styled from "styled-components";
import { GithubOutlined, BugOutlined } from "@ant-design/icons";
import { Layout, Space } from "antd";

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

function Footer() {
  const { Footer } = Layout;
  return (
    <Footer style={{ textAlign: "center" }}>
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
    </Footer>
  );
}

export default Footer;
