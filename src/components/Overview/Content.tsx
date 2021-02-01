import React, { useEffect, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import SummaryBox from "./SummaryBox";
import RecordList from "./RecordList";
import { Layout } from "antd";
import { connect } from "react-redux";
import { RootState } from "../../reducers/index";

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
  type: string;
  category: string;
  recordDate: string;
  createdOn: string;
  updatedOn: string;
}

interface ContentProps {
  records?: Record[];
}

function Content({ records }: ContentProps) {
  const { Content } = Layout;

  const [expenseMonthly, setExpenseMonthly] = useState("");
  const [incomeMonthly, setIncomeMonthly] = useState("");

  const getExpenseAndIncome = () => {
    const expense = records
      ? records
          .filter(
            record =>
              record.type === "expense" &&
              moment().isSame(record.recordDate, "month")
          )
          .map(record => record.amount)
          .reduce((acc, curr) => acc + curr, 0)
      : 0;

    const income = records
      ? records
          .filter(
            record =>
              record.type === "income" && moment().isSame(record.recordDate, "month")
          )
          .map(record => record.amount)
          .reduce((acc, curr) => acc + curr, 0)
      : 0;

    setExpenseMonthly(expense.toFixed(2));
    setIncomeMonthly(income.toFixed(2));
  };

  useEffect(() => {
    getExpenseAndIncome();
  }, [records]);

  return (
    <Content style={{ margin: "4px 16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, paddingTop: 5, minHeight: 360, marginTop: 30 }}
      >
        <SummaryWrapper>
          <SummaryBox type="expense" amount={expenseMonthly}></SummaryBox>
          <SummaryBox type="income" amount={incomeMonthly}></SummaryBox>
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
}

const mapStateToProps = (state: RootState) => {
  return {
    records: state.HomeReducer.records,
  };
};

export default connect(mapStateToProps, null)(Content);
