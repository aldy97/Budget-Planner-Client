import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { Options } from "./Content";
import moment from "moment";
import { Record } from "../Overview/Content";

interface TempDataCorrectedProps {
  value: number | undefined;
  name: string;
}

interface PieChartProps {
  type: "expense" | "income";
  records: Record[];
  period: string;
}

function PieChart({ type, records, period }: PieChartProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [data, setData] = useState([]);

  const initData = (): void => {
    const map = new Map<string, number>();
    records = records.filter(record => record.type === type);

    if (period === Options.LAST_MONTH || period === Options.LAST_WEEK) {
      const days = period === Options.LAST_MONTH ? 29 : 6;
      records = records.filter(
        record => moment().diff(moment(record.recordDate), "days") <= days
      );
      for (const record of records) {
        const num = map.get(record.category) || 0;
        map.set(record.category, num + record.amount);
      }
    } else {
      records = records.filter(record =>
        moment(record.recordDate).isSame(moment(period), "month")
      );
      for (const record of records) {
        const num = map.get(record.category) || 0;
        map.set(record.category, num + record.amount);
      }
    }

    const map2: any = [];
    for (const [key, value] of map) {
      map2.push({ value, name: key });
    }
    setData(map2);
    setCategories(Array.from(map.keys()));
  };

  useEffect(() => {
    initData();
  }, [records, period]);

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: 10,
      data: categories,
    },
    series: [
      {
        name: "Category",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "30",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
  };

  return (
    <div>
      <ReactEcharts
        style={{}}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
      />
    </div>
  );
}

export default PieChart;
