import React, { useMemo } from "react";
import moment from "moment";
import styled from "styled-components";
import SummaryBox from "./SummaryBox";
import RecordList from "./RecordList";
import { Layout } from "antd";
import { RootState } from "../../reducers/index";
import { useSelector } from "react-redux";

const SummaryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ListsWrapper = styled.div`
  display: flex;
`;

const StyledHint = styled.div`
  margin-top: 10px;
  text-align: center;
  color: #8c8c8c;
`;

export interface Record {
  _id: string;
  amount: number;
  description: string;
  title: string;
  type: "expense" | "income" | "";
  category: string;
  recordDate: string;
  createdOn: string;
  updatedOn: string;
}

const Content: React.FC = () => {
  const { Content } = Layout;

  const { records } = useSelector((s: RootState) => {
    return { records: s.HomeReducer.records };
  });

  const expense = useMemo(() => {
    return records
      .filter(
        record =>
          record.type === "expense" && moment().isSame(record.recordDate, "month")
      )
      .map(record => record.amount)
      .reduce((acc, curr) => acc + curr, 0);
  }, [records]);

  const income = useMemo(() => {
    return records
      .filter(
        record =>
          record.type === "income" && moment().isSame(record.recordDate, "month")
      )
      .map(record => record.amount)
      .reduce((acc, curr) => acc + curr, 0);
  }, [records]);

  return (
    <Content style={{ margin: "4px 16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, paddingTop: 5, minHeight: 360, marginTop: 30 }}
      >
        <SummaryWrapper>
          <SummaryBox type="expense" amount={expense.toFixed(2)}></SummaryBox>
          <SummaryBox type="income" amount={income.toFixed(2)}></SummaryBox>
        </SummaryWrapper>
        <ListsWrapper>
          <RecordList
            records={records as Record[]}
            maxLength={5}
            type="expense"
          ></RecordList>
          <RecordList
            records={records as Record[]}
            maxLength={5}
            type="income"
          ></RecordList>
        </ListsWrapper>
        <StyledHint>Only 5 most recent records are shown</StyledHint>
      </div>
    </Content>
  );
};

export default Content;
