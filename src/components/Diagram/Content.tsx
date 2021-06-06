import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Layout, Dropdown, Button, Menu, Space } from "antd";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { Record } from "../Overview/Content";
import { RootState } from "../../reducers/index";
import moment from "moment";

const DropdownWrapper = styled.div`
  text-align: center;
`;

const StyledChartsWrapper = styled.div`
  display: flex;
`;

const Title = styled.div`
  text-align: center;
  color: #595959;
  font-size: 20px;
  font-weight: bold;
`;

export enum Options {
  LAST_WEEK = "In the past week",
  LAST_MONTH = "In the past month",
}

const Content: React.FC = () => {
  const { Content } = Layout;
  const [period, setPeriod] = useState<string>(Options.LAST_WEEK);
  const [options, setOptions] = useState<string[]>([]);

  const { records } = useSelector((s: RootState) => {
    return { records: s.HomeReducer.records };
  });

  const initOptions = (): void => {
    if (!records) return;
    let tempOptions: string[] = [];
    tempOptions = Object.values(Options);

    const dates = records.map(record => moment(record.recordDate).format("YYYY-MM"));

    for (const date of dates as string[]) {
      if (!tempOptions.includes(date)) {
        tempOptions.push(date);
      }
    }

    setOptions(tempOptions);
  };

  // when records change, options will also change accordingly
  useEffect(() => {
    initOptions();
  }, [records]);

  const menu = (
    <Menu>
      {options.map(option => {
        return (
          <Menu.Item
            key={option}
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
            <div>Choose period:</div>
            <Dropdown overlay={menu} placement="bottomCenter">
              <Button>{period}</Button>
            </Dropdown>
          </Space>
        </DropdownWrapper>
        <StyledChartsWrapper>
          <div style={{ flex: 1 }}>
            <Title>Expense Distribution</Title>
            <PieChart
              records={records as Record[]}
              type="expense"
              period={period}
            ></PieChart>
          </div>
          <div style={{ flex: 1 }}>
            <Title>Income Distribution</Title>
            <PieChart
              records={records as Record[]}
              type="income"
              period={period}
            ></PieChart>
          </div>
        </StyledChartsWrapper>
        <div style={{ marginLeft: 120, marginRight: 120 }}>
          <Title>Expense Trend</Title>
          <LineChart
            records={records as Record[]}
            type="expense"
            period={period}
          ></LineChart>
          <Title>Income Trend</Title>
          <LineChart
            records={records as Record[]}
            type="income"
            period={period}
          ></LineChart>
        </div>
      </div>
    </Content>
  );
};

export default Content;
