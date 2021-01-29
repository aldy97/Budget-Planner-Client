import React, { useState } from "react";
import { Checkbox } from "antd";

interface TypeInputProps {
  setType: React.Dispatch<React.SetStateAction<string>>;
}
function TypeInput({ setType }: TypeInputProps) {
  const [isExpense, setIsExpense] = useState(true);

  const onChange = () => {
    if (isExpense) {
      setIsExpense(false);
      setType("income");
    } else {
      setIsExpense(true);
      setType("expense");
    }
  };

  return (
    <>
      <Checkbox onChange={onChange} checked={isExpense} data-test="expense">
        Expense
      </Checkbox>
      <Checkbox onChange={onChange} checked={!isExpense} data-test="income">
        Income
      </Checkbox>
    </>
  );
}

export default TypeInput;
