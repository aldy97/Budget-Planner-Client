import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

// renders statistical fact based on history and filter
const Summary: React.FC = () => {
  const { enable, category, month } = useSelector((s: RootState) => {
    return {
      enable: s.FilterReducer.filter.enabled,
      category: s.FilterReducer.filter.category,
      month: s.FilterReducer.filter.month,
    };
  });

  if (!enable) return null;

  return <></>;
};

export default Summary;
