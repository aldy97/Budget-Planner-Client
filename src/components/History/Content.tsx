import React from "react";
import { Layout } from "antd";
import Filter from "./Filter";
import Summary from "./Summary";
import RecordList from "./RecordList";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

const Content: React.FC = () => {
  const { Content } = Layout;

  const { showNumber } = useSelector((s: RootState) => {
    return { showNumber: s.HomeReducer.user.showNumber };
  });

  return (
    <Content style={{ margin: "4px 16px" }}>
      <div
        className="site-layout-background"
        style={{
          paddingLeft: 152,
          paddingRight: 152,
          paddingTop: 24,
          paddingBottom: 24,
          minHeight: 360,
          marginTop: 30,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Filter></Filter>
        </div>
        {showNumber && <Summary></Summary>}
        <RecordList></RecordList>
      </div>
    </Content>
  );
};

export default Content;
