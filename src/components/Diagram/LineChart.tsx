import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import moment from "moment";
import { COLORS } from "../../utils/constants";
import { Record } from "../Overview/Content";
import { Options } from "./Content";

interface LineChartProps {
  type: "expense" | "income";
  records: Record[];
  period: string;
}

//折线图：根据记录类型展示消费/收入记录
function LineChart({ type, records, period }: LineChartProps): JSX.Element {
  const [days, setDays] = useState<string[]>([]);
  const [totals, setTotals] = useState<number[]>([]);

  //根据传入的记录类型，统计花费/收入
  const initLineChartData = (): void => {
    const tempTotals = new Map<string, number>();
    records = records.filter(record => record.type === type);
    if (period === Options.LAST_MONTH || period === Options.LAST_WEEK) {
      const days = period === Options.LAST_MONTH ? 29 : 6;
      for (let i = days; i >= 0; i--) {
        const day = moment(Date.now() - i * 24 * 3600 * 1000).format("YYYY-MM-DD");
        tempTotals.set(day, 0);
      }

      records = records.filter(
        record => moment().diff(moment(record.recordDate), "days") <= days
      );

      for (const record of records) {
        const num =
          tempTotals.get(moment(record.recordDate).format("YYYY-MM-DD")) || 0;
        tempTotals.set(
          moment(record.recordDate).format("YYYY-MM-DD"),
          num + record.amount
        );
      }
    } else {
      const numOfDays = moment(period, "YYYY-MM").daysInMonth();
      for (let i = 1; i <= numOfDays; i++) {
        if (i < 10) {
          tempTotals.set(moment(period).format("YYYY-MM") + `-0${i}`, 0);
        } else {
          tempTotals.set(moment(period).format("YYYY-MM") + `-${i}`, 0);
        }
      }

      records = records.filter(record =>
        moment(record.recordDate).isSame(period, "month")
      );

      for (const record of records) {
        const num =
          tempTotals.get(moment(record.recordDate).format("YYYY-MM-DD")) || 0;
        tempTotals.set(
          moment(record.recordDate).format("YYYY-MM-DD"),
          num + record.amount
        );
      }
    }

    setDays(Array.from(tempTotals.keys()));
    setTotals(Array.from(tempTotals.values()));
  };

  // 两个函数的顺序不能颠倒
  useEffect(() => {
    initLineChartData();
  }, [records, period]);

  const expenseOption = {
    xAxis: {
      type: "category",
      data: days,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: totals,
        type: "line",
      },
    ],
    color: {
      type: "radical",
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: COLORS.ORANGE,
        },
        {
          offset: 1,
          color: COLORS.ORANGE,
        },
      ],
      global: false,
    },
  };

  const incomeOption = {
    xAxis: {
      type: "category",
      data: days,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: totals,
        type: "line",
      },
    ],
    color: {
      type: "radical",
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: COLORS.THEMEBLUE,
        },
        {
          offset: 1,
          color: COLORS.THEMEBLUE,
        },
      ],
      global: false,
    },
  };

  return (
    <div>
      <ReactEcharts
        option={type === "expense" ? expenseOption : incomeOption}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
      />
    </div>
  );
}

export default LineChart;
