import React from "react";
import SideMenu from "../components/SideMenu";
import { Layout } from "antd";
import Content from "../components/Overview/Content";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { connect } from "react-redux";
import { RootState } from "../reducers/index";

interface OverViewProps {
  email?: string;
}

function OverView({ email }: OverViewProps) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideMenu selected={1}></SideMenu>
      <Layout className="site-layout">
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    email: state.HomeReducer.email,
  };
};

export default connect(mapStateToProps, null)(OverView);
