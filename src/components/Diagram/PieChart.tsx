import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import moment from "moment";
import { Record } from "../Overview/Content";
import { connect } from "react-redux";
import { RootState } from "../../reducers/index";

interface TempDataCorrectedProps {
  value: number | undefined;
  name: string;
}

interface PieChartProps {
  type: "expense" | "income";
  records?: Record[];
}

function PieChart({ type, records }: PieChartProps) {
  const filteredRecords = records
    ? records.filter(record => record.type === type)
    : [];

  const [days, setDays] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [data, setData] = useState([]);

  // 取得包括今天在内的七天日期📅
  const getDays = () => {
    const last7Days: string[] = [];
    for (let i = 0; i < 7; i++) {
      last7Days.push(moment(Date.now() - i * 24 * 3600 * 1000).format("MM-DD"));
    }
    setDays(last7Days);
  };

  // 根据传入的记录类型，统计过去七天各个项目的数量总额
  const getAmountOfEachCategoryInPastSevenDays = () => {
    const tempData = new Map<string, number>();
    const tempCategories: string[] = [];
    for (const record of filteredRecords) {
      const date = record.recordDate.slice(5, 10);
      if (days.includes(date) && !tempCategories.includes(record.category)) {
        tempCategories.push(record.category);
        tempData.set(record.category, record.amount);
      } else if (days.includes(date) && tempCategories.includes(record.category)) {
        const curr: number = tempData.get(record.category) as number;
        tempData.set(record.category, record.amount + curr);
      }
    }
    const tempDataCorrected: TempDataCorrectedProps[] = [];
    for (let i = 0; i < tempCategories.length; i++) {
      tempDataCorrected.push({
        value: tempData.get(tempCategories[i]),
        name: tempCategories[i],
      });
    }
    setCategories(tempCategories);
    setData(tempDataCorrected as any);
  };

  useEffect(() => {
    getDays();
    getAmountOfEachCategoryInPastSevenDays();
  }, [records, type]);

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

const mapState = (state: RootState) => {
  return {
    records: state.HomeReducer.records,
  };
};

export default connect(mapState, null)(PieChart);
