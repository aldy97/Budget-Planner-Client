import React, { useState } from "react";
import styled from "styled-components";
import { Layout, Dropdown, Button, Menu, Space } from "antd";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

const DropdownWrapper = styled.div`
  text-align: center;
`;

const StyledChartsWrapper = styled.div`
  display: flex;
`;

const LeftSection = styled.div`
  flex: 1;
`;

const RightSection = styled.div`
  flex: 1;
`;

const Title = styled.div`
  text-align: center;
  color: #595959;
  font-size: 20px;
  font-weight: bold;
`;

enum Options {
  LAST_WEEK = "Last week",
  LAST_MONTH = "Last month",
  LAST_YEAR = "Last year",
}

function Content(): JSX.Element {
  const { Content } = Layout;
  const [period, setPeriod] = useState<string>(Options.LAST_WEEK);

  const menu = (
    <Menu>
      {Object.values(Options).map((option, index) => {
        return (
          <Menu.Item
            key={index}
            onClick={() => {
              setPeriod(option);
            }}
          >
            <a>{option}</a>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <Content style={{ margin: "4px 16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 30, minHeight: 360, marginTop: 30 }}
      >
        <DropdownWrapper>
          <Space direction="horizontal">
            <span>Select Period:</span>
            <Dropdown overlay={menu} placement="bottomCenter">
              <Button>{period}</Button>
            </Dropdown>
          </Space>
        </DropdownWrapper>
        <StyledChartsWrapper>
          <LeftSection>
            <Title>Expense Distribution</Title>
            <PieChart type="expense"></PieChart>
          </LeftSection>
          <RightSection>
            <Title>Income Distribution</Title>
            <PieChart type="income"></PieChart>
          </RightSection>
        </StyledChartsWrapper>
        <div style={{ marginLeft: 120, marginRight: 120 }}>
          <Title>Expense Trend</Title>
          <LineChart type="expense"></LineChart>
          <Title>Income Trend</Title>
          <LineChart type="income"></LineChart>
        </div>
      </div>
    </Content>
  );
}

export default Content;
