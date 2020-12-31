import React from "react";
import styled from "styled-components";

const StyledBox = styled.div<Box>`
  padding: 80px;
  border-radius: 10px;
  margin: 32px;
  text-align: center;
  flex: 1;
  font-size: 30px;
  background: ${props =>
    props.type === "income"
      ? "linear-gradient(rgb(66, 161, 236), rgb(0, 112, 201))"
      : "linear-gradient(#ffa940,#d46b08)"};
  color: #fff;
`;

interface Box {
  type?: "expense" | "income";
  amount?: number;
}

function SummaryBox({ type, amount }: Box): JSX.Element {
  return (
    <StyledBox type={type}>
      <div data-test="type">
        {type === "expense" ? "Monthly Expense" : "Monthly Income"}:
      </div>
      <div data-test="amount">${amount}</div>
    </StyledBox>
  );
}

export default SummaryBox;
