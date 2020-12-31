import React from "react";
import { Layout } from "antd";
import Filter from "./Filter";
import RecordList from "./RecordList";

function Content(): JSX.Element {
  const { Content } = Layout;
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
        <RecordList></RecordList>
      </div>
    </Content>
  );
}

export default Content;
