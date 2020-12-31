import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

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

function Content(): JSX.Element {
  const { Content } = Layout;
  return (
    <Content style={{ margin: "4px 16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 30, minHeight: 360, marginTop: 30 }}
      >
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
