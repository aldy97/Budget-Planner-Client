import React, { useEffect } from "react";
import { notification, Button, Statistic } from "antd";
import { AccountBookOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { COLORS, ExpenseCategories } from "../../utils/constants";

// renders statistical fact based on history and filter
const Summary: React.FC = () => {
  const { records, enable, category, month, expenseList, incomeList } = useSelector(
    (s: RootState) => {
      return {
        records: s.HomeReducer.records,
        enable: s.FilterReducer.filter.enabled,
        category: s.FilterReducer.filter.category,
        month: s.FilterReducer.filter.month,
        expenseList: s.HomeReducer.user.expenseList,
        incomeList: s.HomeReducer.user.incomeList,
      };
    }
  );

  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      Confirm
    </Button>
  );
  const key = "notify user";

  const showStats = (): void => {
    let description: React.ReactNode = <></>;
    let amount = 0;

    if (category && month) {
      amount = records
        .filter(record => record.recordDate.slice(0, 7) === month)
        .filter(record => record.category === category)
        .reduce((acc, curr) => acc + curr.amount, 0);

      const isExpense = (
        expenseList.length ? expenseList : ExpenseCategories
      ).includes(category);

      const stat = (
        <Statistic
          value={amount}
          valueStyle={{
            color: isExpense ? "#cf1322" : "#3f8600",
          }}
          precision={2}
          prefix="$"
        ></Statistic>
      );

      description = isExpense ? (
        <div>
          In {month}, you have spent:
          {stat} on {category}
        </div>
      ) : (
        <div>
          In {month}, you have earned: {stat} from {category}
        </div>
      );
    } else if (month) {
      const expense = records
        .filter(
          record =>
            record.type === "expense" && record.recordDate.slice(0, 7) === month
        )
        .reduce((acc, curr) => acc + curr.amount, 0);

      const income = records
        .filter(
          record =>
            record.type === "income" && record.recordDate.slice(0, 7) === month
        )
        .reduce((acc, curr) => acc + curr.amount, 0);

      const expenseStat = (
        <Statistic
          value={expense}
          valueStyle={{ color: "#cf1322" }}
          precision={2}
          prefix="$"
        ></Statistic>
      );

      const incomeStat = (
        <Statistic
          value={income}
          valueStyle={{ color: "#3f8600" }}
          precision={2}
          prefix="$"
        ></Statistic>
      );

      description = (
        <div>
          In {month}, you have spent: {expenseStat} and earned {incomeStat}
        </div>
      );
    }

    if (amount > 0 || (!category && month)) {
      notification.info({
        message: null,
        description,
        icon: <AccountBookOutlined style={{ color: COLORS.THEMEBLUE }} />,
        btn,
        key,
      });
    }
  };

  useEffect(() => {
    if (enable && (category || month)) showStats();
  }, [enable, category, month]);

  // when filter is disabled, close it
  useEffect(() => {
    if (!enable) notification.close(key);
  }, [enable]);

  return <></>;
};

export default Summary;
