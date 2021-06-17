import React, { useState, useEffect, useCallback } from "react";
import { Record } from "../Overview/Content";
import { Options } from "./Content";
import moment from "moment";
import { Empty } from "antd";
import ReactEcharts from "echarts-for-react";

interface PieChartProps {
  type: "expense" | "income";
  records: Record[];
  period: string;
}

const PieChart: React.FC<PieChartProps> = ({
  type,
  records,
  period,
}: PieChartProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [data, setData] = useState([]);

  const initData = useCallback(() => {
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

    const map2: never[] = [];
    for (const [key, value] of map) {
      map2.push({ value, name: key } as never);
    }

    setData(map2);
    setCategories(Array.from(map.keys()));
  }, [records, period]);

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

  // render pie chart if record(s), otherwise shows empty state
  return data.length ? (
    <div>
      <ReactEcharts
        style={{}}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
      />
    </div>
  ) : (
    <Empty
      style={{ marginTop: 32, marginBottom: 32 }}
      description={
        <div style={{ color: "#595959", fontSize: 16, fontWeight: "bold" }}>
          No record found
        </div>
      }
    ></Empty>
  );
};

export default PieChart;
