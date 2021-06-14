import React from "react";
import { RootState } from "../../reducers";
import { useSelector } from "react-redux";
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
  type?: "expense" | "income" | undefined;
  amount?: string;
}

const SummaryBox: React.FC<Box> = ({ type, amount }: Box) => {
  const { showNumber } = useSelector((s: RootState) => {
    return { showNumber: s.HomeReducer.user.showNumber };
  });

  return (
    <StyledBox type={type}>
      <div data-test="type">
        {type === "expense" ? "Monthly Expense" : "Monthly Income"}:
      </div>
      <div data-test="amount">${showNumber ? amount : "****"}</div>
    </StyledBox>
  );
};

export default SummaryBox;
